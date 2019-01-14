from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from .models import Menu, MenuItem


class MenuAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {
            'fields': ['name', 'description', 'photo']
        })
    ]
    list_display = ('name', 'photo', 'publication')
    list_editable = ('publication',)


class MenuItemAdmin(MPTTModelAdmin):
    fieldsets = [
        (None, {
            'fields': ['name', 'parent', 'menu', 'path', 'order', 'description', 'photo']
        })
    ]
    list_display = ('name', 'menu', 'path', 'order', 'publication')
    list_editable = ('publication',)
    list_display_links = ('name',)


admin.site.register(Menu, MenuAdmin)
admin.site.register(MenuItem, MenuItemAdmin)