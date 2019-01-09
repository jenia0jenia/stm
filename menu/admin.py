from django.contrib import admin
from mptt.admin import MPTTModelAdmin
from .models import Menu, MenuItem


class MenuAdmin(admin.ModelAdmin):
    list_display = ('name', 'photo', 'publication')
    list_editable = ('publication',)

class MenuItemAdmin(MPTTModelAdmin):
    fielset = [
        (None, {
            'fields': ['name', 'parent', 'menu']
        })
    ]
    list_display = ('name', 'photo', 'publication')
    list_editable = ('publication',)
    list_display_links = ('name',)


admin.site.register(Menu, MenuAdmin)
admin.site.register(MenuItem, MenuItemAdmin)