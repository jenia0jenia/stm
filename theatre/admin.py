from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext as _
from django.conf.locale.en import formats as en_formats
from filebrowser.base import FileObject
from filebrowser.settings import ADMIN_THUMBNAIL
from .models import Genre, Performance, Artist, Role, Poster

from content_gallery.admin import ImageAdminInline

en_formats.DATETIME_FORMAT = "d b Y H:i"


class TheatreBaseAdmin(admin.ModelAdmin):
    base_list_editable = ('publication',)
    base_fieldsets = [
        (None, {
            'fields': ['publication'], 'classes': ['']
        })
    ]
    empty_value_display = _('-empty-')

    class Meta:
        abstract = True


class ArtistAdmin(TheatreBaseAdmin):
    fieldsets = [
        (_('Full name'), {
            'fields': ['last_name', 'first_name', 'middle_name', 'slug', ],
            'classes': ['collapse']
        }),
        (None, {
            'fields': ['description', 'photo', 'year']
        })
    ] + TheatreBaseAdmin.base_fieldsets

    prepopulated_fields = {'slug': ('last_name', 'first_name', 'middle_name', )}

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
    photo_thumbnail.short_description = _('Photo')


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
    def get_performance(self, obj):
        return obj.performance.name

    get_performance.admin_order_field = 'performance'
    get_performance.short_description = _('Performance Name')
    fieldsets = [
        (None, {
            'fields': ['name', 'description', 'artists', 'performance', 'photo']
        })
    ] + TheatreBaseAdmin.base_fieldsets
    list_display = ('name', 'get_performance', 'publication')
    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('name',)
    inlines = [
        ImageAdminInline,
    ]


class PerformanceAdmin(TheatreBaseAdmin):
    fieldsets = [
        (None, {
            'fields': ['name', 'slug', 'description', 'genre', 'photo']
        }),
        (_('Opening / Closing performance'), {
            'fields': ['premiere_date', 'close_date'],
            'classes': ['collapse']
        }),
        (_('Rating'), {
            'fields': ['votes_yes', 'votes_no'],
            'classes': ['collapse']
        })
    ] + TheatreBaseAdmin.base_fieldsets

    list_display = ('name', 'genre', 'premiere_date', 'close_date', 'publication')
    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('name',)

    prepopulated_fields = {'slug': ('name',)}

    inlines = [
        ImageAdminInline,
    ]


class PosterAdmin(TheatreBaseAdmin):
    fieldsets = [
        (None, {
            'fields': ['event', 'description', 'date', 'photo', 'is_premiere']
        })
    ] + TheatreBaseAdmin.base_fieldsets
    list_display = ('event', 'date', 'is_premiere', 'publication')
    list_editable = () + TheatreBaseAdmin.base_list_editable
    list_display_links = ('event',)
    inlines = [
        ImageAdminInline,
    ]


admin.site.register(Role, RoleAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Performance, PerformanceAdmin)
admin.site.register(Artist, ArtistAdmin)
admin.site.register(Poster, PosterAdmin)