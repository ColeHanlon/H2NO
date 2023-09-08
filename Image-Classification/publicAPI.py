from flask import *
import json
from io import BytesIO
import base64
import os
import sys

from keras.models import load_model  # TensorFlow is required for Keras to work
from PIL import Image, ImageOps  # Install pillow instead of PIL
import numpy as np

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hi():
    print(request)
    return json.dumps({'Greeting': 'Hello there!'})

@app.route('/classify', methods=['GET', 'POST'])
def classify():
    if request.method == 'POST':
        data = request.get_json()
        b64_string = data.get('photo')

        b64 = base64.b64decode(b64_string)
        with open('uploaded_img.jpeg', 'wb') as out:
            out.write(b64)
        print("after decode image")

        # Disable scientific notation for clarity
        np.set_printoptions(suppress=True)

        # Load the model
        model = load_model("keras_Model.h5", compile=False)

        # Load the labels
        class_names = open("labels.txt", "r").readlines()

        # Create the array of the right shape to feed into the keras model
        # The 'length' or number of images can put into the array is
        # determined by the first position in the shape tuple, in this case 1
        data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

        # Path to image
        image = Image.open("/Users/meigonstuy/Desktop/Fall2022/CS4000/H2N0/venv/uploaded_img.jpeg").convert("RGB")

        # resizing the image to be at least 224x224 and then cropping from the center
        size = (224, 224)
        image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)

        # turn the image into a numpy array
        image_array = np.asarray(image)

        # Normalize the image
        normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1

        # Load the image into the array
        data[0] = normalized_image_array

        # Predicts the model
        prediction = model.predict(data)
        index = np.argmax(prediction)
        class_name = class_names[index]
        confidence_score = prediction[0][index]
        # Print prediction and confidence score
        print("Class:", class_name[2:], end="")
        print("Confidence Score:", confidence_score)

        return jsonify({"Class": class_name[2:]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port = 5002)
