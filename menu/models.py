import os

from django.db import models
from django.utils.translation import gettext as _
from mptt.models import MPTTModel, TreeForeignKey, TreeManager
from tinymce import HTMLField
from filebrowser.fields import FileBrowseField

def upload_path(path):
    return os.path.join('uploads', str(path))

class MenuBase(models.Model):

    description = HTMLField(
        _('Description'),
        max_length=400,
        blank=True
        )

    photo = photo = FileBrowseField(
        _('Menu item\'s photo'),
        max_length=200,
        directory=upload_path('menu/'),
        extensions=['.jpg', '.png', '.gif', '.svg'],
        blank=True,
        null=True
        )

    publication = models.BooleanField(
        _('Publication'),
            default=True
        )


    # login_required = models.BooleanField(
    #     _('Login required'),
    #     blank=True,
    #     default=False,
    #     help_text=_(u'Should this item only be shown to authenticated users?')
    #     )

    # anonymous_only = models.BooleanField(
    #     _('Anonymous only'),
    #     blank=True,
    #     default=False,
    #     help_text=_('Should this item only be shown to non-logged-in users?')
    #     )

    class Meta:
        abstract = True


class Menu(MenuBase):
    name = models.CharField(
        _('Name'),
        max_length=250,
        blank=False
        )

    class Meta:
        verbose_name = _('Menu')
        verbose_name_plural = _('Menus')

    def __str__(self):
        return self.name


class MenuItem(MPTTModel, MenuBase):
    name = models.CharField(
        _('Name'),
        max_length=250,
        blank=False
        )

    path = models.CharField(
        _('Path'),
        max_length=250,
        help_text=_('URL or URI to the content, eg /about/ or http://foo.com/'),
        blank=True,
        default='#'
        )

    menu = models.ForeignKey(
        Menu,
        verbose_name=_('Menu'),
        on_delete=models.CASCADE
        )

    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name=_('Children')
        )
    
    order = models.IntegerField(
        _('Order'),
        blank=False,
        default=500,
        )

    def __str__(self):
        return self.name

    class MPTTMeta:
        order = ['order']
        order_insertion_by = ['order']
        verbose_name = _('Menu item')
        verbose_name_plural = _('Menu items')