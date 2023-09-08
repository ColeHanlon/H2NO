# Need to have tensorflow and numpy installed

import sys
import numpy as np
import tensorflow as tf
from tensorflow import keras

def classify_image(image_path):
    # Load the model
    # Make sure the model name and path is correct
    reconstructed_model = keras.models.load_model("my_model")

    # Modify these when add more labels
    class_names = ['aluminum', 'glass_jars', 'plastic_bottles']

    # Predict the classification of an image
    img_height = 1000
    img_width = 1000

    # Load and resize the image
    img = tf.keras.utils.load_img(
        image_path, target_size = (img_height, img_width)
    )

    img_array = tf.keras.utils.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) # Create a batch

    predictions = reconstructed_model.predict(img_array)
    score = tf.nn.softmax(predictions[0])

    print("This image most likely belongs to {} with a {:.2f} percent confidence."
          .format(class_names[np.argmax(score)], 100 * np.max(score))
    )

def main(argv):
    classify_image(argv[0])

if __name__ == '__main__':
    args = sys.argv
    main(args[1:])