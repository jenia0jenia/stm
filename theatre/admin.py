from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext as _
from django.conf.locale.en import formats as en_formats
from filebrowser.base import FileObject
from filebrowser.settings import ADMIN_THUMBNAIL
from .models import Performance, Artist, Poster

from content_gallery.admin import ImageAdminInline

en_formats.DATETIME_FORMAT = "d b Y H:i"


class TheatreBaseAdmin(admin.ModelAdmin):
    base_fieldsets = [
        (None, {
            'fields': ['order', 'publication'], 'classes': ['']
        })
    ]
    base_list_editable = ('order', 'publication',)
    base_list_display = ('order', 'publication',)

    empty_value_display = _('_empty_')

    inlines = [
        ImageAdminInline,
    ]

    def photo_thumbnail(self, obj):
        if obj.photo:
            image = FileObject(obj.photo.path)
            if image.filetype == "Image":
                return format_html('<img src="{}" />', image.version_generate(ADMIN_THUMBNAIL).url)
        else:
            return ""

    photo_thumbnail.allow_tags = True
    photo_thumbnail.short_description = _('Photo')

    class Meta:
        abstract = True


class ArtistAdmin(TheatreBaseAdmin):
    fieldsets = [
        (_('Full name'), {
            'fields': ['name', 'last_name', 'middle_name', 'slug', ],
            'classes': ['']
        }),
        (None, {
            'fields': ['description', 'photo', 'year']
        })
    ] + TheatreBaseAdmin.base_fieldsets

    prepopulated_fields = {'slug': ('name', 'last_name', 'middle_name', )}

    list_display = (
        'name',
        'last_name',
        'middle_name',
        'photo_thumbnail',
    ) + TheatreBaseAdmin.base_list_display

    list_editable = ('middle_name',) + TheatreBaseAdmin.base_list_editable
    list_display_links = ('name',)


class PerformanceAdmin(TheatreBaseAdmin):
    fieldsets = [
        (None, {
            'fields': [
                'name',
                'slug',
                'duration',
                'description',
                'photo',
                'is_archive'
            ]
        }),
        (_('Rating'), {
            'fields': ['votes_yes', 'votes_no'],
            'classes': ['collapse']
        })
    ] + TheatreBaseAdmin.base_fieldsets

    list_display = (
        'name',
        'photo_thumbnail',
        'is_archive',
    ) + TheatreBaseAdmin.base_list_display

    list_editable = ('is_archive', ) + TheatreBaseAdmin.base_list_editable
    list_display_links = ('name',)

    prepopulated_fields = {'slug': ('name',)}


class PosterAdmin(TheatreBaseAdmin):
    fieldsets = [
        (None, {
            'fields': ['event', 'description', 'date', 'photo', 'is_premiere']
        })
    ] + TheatreBaseAdmin.base_fieldsets

    list_display = (
        'event',
        'photo_thumbnail',
        'date',
        'is_premiere',
    ) + TheatreBaseAdmin.base_list_display

    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('event',)
    inlines = [
        ImageAdminInline,
    ]


# admin.site.register(Genre, GenreAdmin)
admin.site.register(Performance, PerformanceAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Poster, PosterAdmin)
