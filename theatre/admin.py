from django.contrib import admin
from django.utils.html import format_html
from django.conf.locale.en import formats as en_formats

from filebrowser.base import FileObject
from filebrowser.settings import ADMIN_THUMBNAIL

from .models import Genre, Spectacle, Artist, Role, Afisha

from content_gallery.admin import ImageAdminInline

en_formats.DATETIME_FORMAT = "d b Y H:i"

class TheatreBaseAdmin(admin.ModelAdmin):
    base_list_editable = ('publication',)
    base_fieldsets = [
        ('Позиция / Публикация', {
            'fields': ['position', 'publication'], 'classes': ['collapse']
        })
    ]

    class Meta:
        abstract = True


class ArtistAdmin(TheatreBaseAdmin):
    fieldsets = [
        ('ФИО', {
            'fields': ['last_name', 'first_name', 'middle_name'],
            'classes': ['collapse']
        }),
        (None, {
            'fields': ['description', 'photo', 'year']
        })
    ] + TheatreBaseAdmin.base_fieldsets
    list_display = ('last_name', 'photo_thumbnail', 'publication')
    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('last_name',)
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
    photo_thumbnail.short_description = "Аватар"


class GenreAdmin(TheatreBaseAdmin):
    fieldsets = [
        (None, {
            'fields': ['name', 'description', 'photo']
        })
    ] + TheatreBaseAdmin.base_fieldsets
    list_display = ('name', 'publication')
    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('name',)


class RoleAdmin(TheatreBaseAdmin):
    fieldsets = [
        (None, {
            'fields': ['name', 'description', 'artists', 'spectacle', 'photo']
        })
    ] + TheatreBaseAdmin.base_fieldsets
    list_display = ('name', 'publication')
    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('name',)
    inlines = [
        ImageAdminInline,
    ]


class SpectacleAdmin(TheatreBaseAdmin):
    fieldsets = [
        (None, {
            'fields': ['name', 'description', 'genre', 'photo']
        }),
        ('Закрытие / Открытие', {
            'fields': ['premiere_date', 'close_date', 'is_premiere'],
            'classes': ['collapse']
        }),
        ('Рейтинг', {
            'fields': ['rating_yes', 'rating_no'],
            'classes': ['collapse']
        })
    ] + TheatreBaseAdmin.base_fieldsets
    list_display = ('name', 'genre', 'premiere_date', 'close_date', 'is_premiere', 'publication')
    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('name',)
    inlines = [
        ImageAdminInline,
    ]


class AfishaAdmin(TheatreBaseAdmin):
    fieldsets = [
        (None, {
            'fields': ['event', 'description', 'event_date', 'photo']
        })
    ] + TheatreBaseAdmin.base_fieldsets
    list_display = ('event', 'event_date', 'publication')
    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('event',)
    inlines = [
        ImageAdminInline,
    ]


admin.site.register(Role, RoleAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Spectacle, SpectacleAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Afisha, AfishaAdmin)