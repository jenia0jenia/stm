from django.db import models

from django.contrib import admin
from django.contrib.sites.models import Site
from django.contrib.flatpages.admin import FlatPageAdmin
from django.contrib.flatpages.models import FlatPage
from tinymce.widgets import TinyMCE

from .models import Properties

class SiteAdmin(admin.ModelAdmin):
    fields = ('id', 'name', 'domain')
    readonly_fields = ('id',)
    list_display = ('id', 'name', 'domain')
    list_display_links = ('name',)
    search_fields = ('name', 'domain')


class FlatPageCustom(FlatPageAdmin):
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE()}
    }


class PropertiesAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {
            'fields': ['name', 'value', 'addition_value',]
        })
    ]
    list_display = ('name', 'value', 'addition_value',)
    list_editable = ('value',)
    list_display_links = ('name',)

admin.site.register(Properties, PropertiesAdmin)

admin.site.unregister(Site)
admin.site.register(Site, SiteAdmin)

admin.site.unregister(FlatPage)
admin.site.register(FlatPage, FlatPageCustom)
