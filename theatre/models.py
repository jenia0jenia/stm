import os

from django.db import models
from sorl.thumbnail import ImageField

from django.utils import timezone
from django.utils.translation import gettext as _
# from django.utils.text import slugify

from datetime import date
from filebrowser.fields import FileBrowseField
from tinymce import HTMLField
from content_gallery.models import ContentGalleryMixin

from .utils import IntegerRangeField

upload_photo_ext = ['.jpg', '.png', '.gif', '.svg']

def upload_path(path):
    return os.path.join('uploads', str(path))

class TheatreBase(models.Model):
    publication = models.BooleanField(_('Publication'), default=True)

    class Meta:
        abstract = True

    # def save(self, *args, **kwargs):
    #     """
    #     Re-order all items from 10 upwards, at intervals of 10.
    #     This makes it easy to insert new items in the middle of
    #     existing items without having to manually shuffle
    #     them all around.
    #     """
    #     super().save(*args, **kwargs)

    #     current = 10
    #     for item in MenuItem.objects.filter(menu=self).order_by('order'):
    #         item.order = current
    #         item.save()
    #         current += 10


class Artist(ContentGalleryMixin, TheatreBase):
    last_name = models.CharField(_('Last name'), max_length=100, null=True)
    first_name = models.CharField(_('First name'), max_length=100, blank=True, null=True)
    middle_name = models.CharField(_('Middle name'), max_length=100, blank=True, null=True)

    slug = models.SlugField(_('Slug'), max_length=255, unique=True,)

    views = models.PositiveIntegerField(_('Views'), default=0)

    description = HTMLField(_('About artis'), blank=True)

    photo = FileBrowseField(
        _('Artist\'s photo'),
        max_length=200,
        directory=upload_path('people/'),
        extensions=upload_photo_ext,
        blank=True,
        null=True
    )

    year = IntegerRangeField(
        _('In theatre from year...'),
        min_value=1994,
        max_value=date.today().year,
        default=2018,
        blank=True,
        null=True
    )

    class Meta:
        ordering = ['last_name']
        verbose_name = _('Artist')
        verbose_name_plural = _('Artists')

    def __str__(self):
        return self.last_name

    def viewed(self):
        self.views += 1
        self.save(update_fields=['views'])


class Genre(TheatreBase):
    name = models.CharField(_('Genre'), max_length=100)
    description = HTMLField(_('Description'), max_length=400, blank=True)
    photo = FileBrowseField(
        _('Genre\'s photo'),
        max_length=200,
        directory=upload_path('genre/'),
        extensions=upload_photo_ext,
        blank=True,
        null=True
        )

    class Meta:
        verbose_name = _('Genre')
        verbose_name_plural = _('Genres')
        ordering = ['name']

    def __str__(self):
        return self.name


class Performance(ContentGalleryMixin, TheatreBase):
    name = models.CharField(_('Name'), max_length=200)
    slug = models.SlugField(_('Slug'), max_length=255, unique=True,)
    description = HTMLField(_('Description'), blank=True)
    genre = models.ForeignKey(
        Genre,
        on_delete=models.SET_DEFAULT,
        verbose_name=_('Genre'),
        null=True,
        blank=True,
        default=None
    )
    photo = FileBrowseField(
        _('Performance\'s photo'),
        max_length=200,
        directory=upload_path('event/'),
        extensions=upload_photo_ext,
        blank=True,
        null=True
    )
    votes_yes = models.IntegerField(_('Votes "yes!"'), blank=True, default=0)
    votes_no = models.IntegerField(_('Votes "No!"'), blank=True, default=0)

    premiere_date = models.DateField(_('Premiere date'), blank=True, default=timezone.now)
    close_date = models.DateField(_('Closing date'), blank=True, default=date.min)

    artists = models.ManyToManyField('Artist', verbose_name=_('Artists'), blank=True)

    class Meta:
        verbose_name = _('Performance')
        verbose_name_plural = _('Performances')
        ordering = ['name']

    def __str__(self):
        return self.name


class Role(ContentGalleryMixin, TheatreBase):
    name = models.CharField(_('Name'), max_length=200, null=True)
    description = HTMLField(_('About role'), blank=True)
    artists = models.ManyToManyField(Artist, verbose_name=_('Artists'), blank=True)
    performance = models.ForeignKey(
        Performance,
        verbose_name=_('Performance'),
        on_delete=models.CASCADE,
        null=True
    )
    
    photo = FileBrowseField(
        _('Role\'s photo'),
        max_length=200,
        directory=upload_path('people/'),
        extensions=upload_photo_ext,
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _('Role')
        verbose_name_plural = _('Roles')
        ordering = ['performance']

    def __str__(self):
        return self.name


class Poster(ContentGalleryMixin, TheatreBase):
    date = models.DateTimeField(_('Event date'), blank=True, null=True, default=timezone.now)
    event = models.ForeignKey(Performance, verbose_name=_('Event'), on_delete=models.CASCADE)
    is_premiere = models.BooleanField(_('Is premiere'), blank=True, default=False)
    description = HTMLField(_('Description'), blank=True)

    photo = FileBrowseField(
        _('Poster\'s photo'),
        max_length=200,
        directory=upload_path('event/'),
        extensions=['.jpg', '.png', '.gif', '.svg'],
        blank=True,
        null=True
    )

    class Meta:
        verbose_name = _('Event')
        verbose_name_plural = _('Poster')
        ordering = ['date']

    def __str__(self):
        return self.event.name

class Unifest(TheatreBase):
    date_begin = models.DateTimeField(_('Event begin'), blank=True, null=True, default=timezone.now)
    date_end = models.DateTimeField(_('Event end'), blank=True, null=True, default=timezone.now)
    description = HTMLField(_('Description'), blank=True)
