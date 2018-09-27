from django.db import models
from datetime import datetime
from tinymce import HTMLField

class Spectacle(models.Model):
    name = models.CharField('Название', max_length=200, blank=False)
    description = HTMLField('Описание')
    premiere_date = models.DateTimeField('Дата премьеры', default=datetime.now())
    close_date = models.DateTimeField('Дата закрытия спектакля', blank=True)
    is_premiere = models.BooleanField('Премьера?', default=False)

    def __str__(self):
        return self.name