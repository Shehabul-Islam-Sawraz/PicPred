from django.db import models

# Create your models here.
class Image(models.Model):
    picture = models.ImageField()
    classField = models.CharField(max_length=200, blank=True)
    uploaded = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return "Image classified at {}".format(self.uploaded.strftime("%d-%m-%Y %H:%M"))
    
    def save(self, *args, **kwargs):
        try:
            print('Success')
        except:
            print('Classification Failed!!')
        super().save(*args, **kwargs)