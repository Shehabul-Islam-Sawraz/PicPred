from django.db import models
from keras_preprocessing.image import load_img, img_to_array
import numpy as np
from tensorflow.keras.applications.inception_resnet_v2 import InceptionResNetV2, decode_predictions, preprocess_input

# Create your models here.
class Image(models.Model):
    picture = models.ImageField()
    classified = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "Image classified at {}".format(self.uploaded.strftime("%d-%m-%Y %H:%M"))
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        try:
            img = load_img(self.picture.path, target_size=(299, 299))
            # img= Image.open(self.picture)
            img_array = img_to_array(img)
            # print(img_array)
            to_pred = np.expand_dims(img_array, axis=0)
            preprocessed_img = preprocess_input(to_pred)
            model = InceptionResNetV2(weights='imagenet')
            prediction= model.predict(preprocessed_img)
            decoded_pred = decode_predictions(prediction)[0][0][1]
            self.classified = str(decoded_pred)
            print(self.classified)
            print('Success')
        except Exception as e:
            print("Classification Failed!! " + str(e))
        super().save()
        