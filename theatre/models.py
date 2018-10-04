import os
from django.db import models
from django.utils import timezone

from filebrowser.fields import FileBrowseField

from datetime import date
from tinymce import HTMLField

from .views import IntegerRangeField

from django.db import models
from content_gallery.models import ContentGalleryMixin


def upload_path(path):
    return os.path.join('uploads', str(path))

class TheatreBase(models.Model):
    position = models.IntegerField('Позиция', default=0)
    publication = models.BooleanField('Публиковать?', default=True)

    class Meta:
        abstract = True


class Genre(TheatreBase):
    name = models.CharField('Жанр', max_length=100)
    description = models.CharField('Описание', max_length=400, blank=True)
    photo = FileBrowseField('Фото жанра', max_length=200, directory=upload_path('genre/'), extensions=['.jpg', '.png', '.gif', '.svg'], blank=True, null=True)

    class Meta:
        verbose_name = 'Жанр'
        verbose_name_plural = 'Жанры'
        ordering = ['name']

    def __str__(self):
        return self.name


class Spectacle(ContentGalleryMixin, TheatreBase):
    name = models.CharField('Название', max_length=200)
    description = HTMLField('Описание', blank=True)
    genre = models.ForeignKey(Genre, on_delete=models.SET_DEFAULT, verbose_name='Жанр', null=True, blank=True, default=None)
    photo = FileBrowseField('Главное фото', max_length=200, directory=upload_path('event/'), extensions=['.jpg', '.png', '.gif', '.svg'], blank=True, null=True)

    rating_yes = models.IntegerField('Голосов "Понравилось"', blank=True, default=0)
    rating_no = models.IntegerField('Голосов "Не понравилось"', blank=True, default=0)

    premiere_date = models.DateField('Дата премьеры', blank=True, default=timezone.now)
    close_date = models.DateField('Дата закрытия спектакля', blank=True, default=date.min)

    is_premiere = models.BooleanField('Премьера?', blank=True, default=False)
    artists = models.ManyToManyField('Artist', verbose_name='Артисты', blank=True)

    class Meta:
        verbose_name = 'Спектакль'
        verbose_name_plural = 'Спектакли'
        ordering = ['name']

    def __str__(self):
        return self.name


class Artist(ContentGalleryMixin, TheatreBase):
    last_name = models.CharField('Фамилия', max_length=100, null=True)
    first_name = models.CharField('Имя', max_length=100, blank=True, null=True)
    middle_name = models.CharField('Отчество', max_length=100, blank=True, null=True)

    description = HTMLField('О студийце', blank=True)

    photo = FileBrowseField('Аватар', max_length=200, directory=upload_path('people/'), extensions=['.jpg', '.png', '.gif', '.svg'], blank=True, null=True)

    year = IntegerRangeField('В студии с года...', min_value=1994, max_value=date.today().year, default=2018, blank=True, null=True)

    class Meta:
        verbose_name = 'Студиец'
        verbose_name_plural = 'Труппа'
        ordering = ['last_name']

    def __str__(self):
        return self.last_name


class Role(ContentGalleryMixin, TheatreBase):
    name = models.CharField('Имя персонажа', max_length=200, null=True)
    description = HTMLField('О роли', blank=True)
    artists = models.ManyToManyField(Artist, verbose_name='Студийцы', blank=True)
    spectacle = models.ForeignKey(Spectacle, verbose_name='Спектакль', on_delete=models.CASCADE)
    photo = FileBrowseField('Фото роли', max_length=200, directory=upload_path('people/'), extensions=['.jpg', '.png', '.gif', '.svg'], blank=True, null=True)

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'
        ordering = ['spectacle']

    def __str__(self):
        return self.name


class Afisha(ContentGalleryMixin, TheatreBase):
    event_date = models.DateTimeField('Дата события', blank=True, null=True, default=timezone.now)
    event = models.ForeignKey(Spectacle, verbose_name='Событие', on_delete=models.CASCADE)
    description = HTMLField('Комментарий к событию', blank=True)
    photo = FileBrowseField('Фото афиши', max_length=200, directory=upload_path('event/'), extensions=['.jpg', '.png', '.gif', '.svg'], blank=True, null=True)

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'Афиша'
        ordering = ['event_date']

    def __str__(self):
        return self.event.name