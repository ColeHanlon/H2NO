# Need to install tensorflow and numpy using pip
# Run this in an environment with tensorflow

# Tensorflow install
# python3 -m pip install tensorflow
# Verify install:
# python3 -c "import tensorflow as tf; print(tf.reduce_sum(tf.random.normal([1000, 1000])))"

# numpy install
# pip install numpy

import numpy as np
import tensorflow as tf

from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.models import Sequential

batch_size = 1 # Size of the batches of data
img_height = 1000  # all images have to be the same size
img_width = 1000

# Should use 80% of images for training, 20% for validation
data_dir_str = "/Users/meigonstuy/Desktop/Fall2022/CS4000/H2N0/training_imgs" # TODO: Need to update this to be the correct directory where we will store the images

# training dataset
train_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir_str, # This is the path of the directory of the data
    validation_split = 0.2, # 20% of the files will be for validation
    subset = 'validation',
    seed = 123,
    image_size = (1000, 1000),
    batch_size = 1
)

# validation dataset
val_ds = tf.keras.utils.image_dataset_from_directory(
    data_dir_str,
    validation_split = 0.2,
    subset = "validation",
    seed = 123,
    image_size = (img_height, img_width),
    batch_size = batch_size
)

class_names = train_ds.class_names

# Normalize color values
normalization_layer = tf.keras.layers.Rescaling(1./255)

normalized_ds = train_ds.map(lambda x, y: (normalization_layer(x), y))

# Configure the dataset for performance
AUTOTUNE = tf.data.AUTOTUNE

train_ds = train_ds.cache().prefetch(buffer_size = AUTOTUNE)
val_ds = val_ds.cache().prefetch(buffer_size = AUTOTUNE)

# Create the model
num_classes = len(class_names)

model = Sequential([
    layers.Rescaling(1./255, input_shape = (img_height, img_width, 3)),
    layers.Conv2D(16, 3, padding = 'same', activation = 'relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(32, 3, padding = 'same', activation = 'relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding = 'same', activation = 'relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation = 'relu'),
    layers.Dense(num_classes)
])

# Compile the model
model.compile(optimizer = 'adam',
              loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits = True),
              metrics = ['accuracy'])

# Train the model
epochs = 10
history = model.fit(
    train_ds,
    validation_data = val_ds,
    epochs = epochs
)

# Data augmentation -- generate additional training data from existing examples to avoid overfitting (model not able to generalize with new data)
data_augmentation = keras.Sequential(
    [
        layers.RandomFlip("horizontal",
                          input_shape = (img_height,
                                         img_width,
                                         3)),
        layers.RandomRotation(0.1),
        layers.RandomZoom(0.1),
    ]
)

# Augment some data
for images, _ in train_ds.take(1):
    for i in range(9):
        augmented_images = data_augmentation(images)

model = Sequential([
    data_augmentation,
    layers.Rescaling(1./255),
    layers.Conv2D(16, 3, padding = 'same', activation = 'relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(32, 3, padding = 'same', activation = 'relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, padding = 'same', activation = 'relu'),
    layers.MaxPooling2D(),
    layers.Dropout(0.2),
    layers.Flatten(),
    layers.Dense(128, activation = 'relu'),
    layers.Dense(num_classes, name = "outputs")
])

# Compile and train the model
model.compile(optimizer = 'adam',
              loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits = True),
              metrics = ['accuracy'])
model.summary()

epochs = 15
history = model.fit(
    train_ds,
    validation_data = val_ds,
    epochs = epochs
)

# Uncomment the following line if you want to save the model
# This will create a folder that contains all things necessary
# to load and use the model created. 

# model.save("image_classification_model")
