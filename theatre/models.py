import os
from django.db import models
from django.utils import timezone

from datetime import date
from tinymce import HTMLField

from .views import IntegerRangeField

def upload_path(path):
    return os.path.join('uploads', str(path))


class Genre(models.Model):
    name = models.CharField('Жанр', max_length=100)
    description = models.CharField('Описание', max_length=400, blank=True)

    position = models.IntegerField('Позиция', default=0)
    publication = models.BooleanField('Публиковать?', default=True)

    class Meta:
        ordering = ['position', 'name']
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'

    def __str__(self):
        return self.name


class Spectacle(models.Model):
    name = models.CharField('Название', max_length=200)
    description = HTMLField('Описание', blank=True)
    genre = models.ForeignKey(Genre, on_delete=models.SET_DEFAULT, verbose_name='Жанр', null=True, blank=True, default=None)

    rating_yes = models.IntegerField('Голосов "Понравилось"', blank=True, default=0)
    rating_no = models.IntegerField('Голосов "Не понравилось"', blank=True, default=0)

    premiere_date = models.DateField('Дата премьеры', blank=True, default=timezone.now)
    close_date = models.DateField('Дата закрытия спектакля', blank=True, default=date.min)

    is_premiere = models.BooleanField('Премьера?', blank=True, default=False)
    artists = models.ManyToManyField('Artist', verbose_name='Артисты', blank=True)
    
    position = models.IntegerField('Позиция', default=0)
    publication = models.BooleanField('Публиковать?', default=True)

    class Meta:
        ordering = ['position', 'name']
        verbose_name = 'Спектакль'
        verbose_name_plural = 'Спектакли'

    def __str__(self):
        return self.name


class Artist(models.Model):
    last_name = models.CharField('Фамилия', max_length=100, null=True)
    first_name = models.CharField('Имя', max_length=100, blank=True, null=True)
    middle_name = models.CharField('Отчество', max_length=100, blank=True, null=True)
    description = HTMLField('О студийце', blank=True)
    photo = models.ImageField(upload_to=upload_path('artist/'), blank=True, null=True)
    year = IntegerRangeField('В студии с года...', min_value=1994, max_value=date.today().year, default=2018, blank=True, null=True)
    # spectacles = models.ManyToManyField(Spectacle, verbose_name='Спектакли', blank=True)

    position = models.IntegerField('Позиция', default=0)
    publication = models.BooleanField('Публиковать?', default=True)

    class Meta:
        ordering = ['position', 'last_name']
        verbose_name = 'Студиец'
        verbose_name_plural = 'Труппа'

    def __str__(self):
        return self.last_name


class Role(models.Model):
    name = models.CharField('Имя персонажа', max_length=200, null=True)
    artists = models.ManyToManyField(Artist, verbose_name='Студийцы', blank=True)
    spectacles = models.ForeignKey(Spectacle, on_delete=models.CASCADE)

    position = models.IntegerField('Позиция', default=0)
    publication = models.BooleanField('Публиковать?', default=True)

    class Meta:
        ordering = ['position', 'name']
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'

    def __str__(self):
        return self.name