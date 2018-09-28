from django.contrib import admin
from .models import Genre, Spectacle, Artist, Role


class RoleInline(admin.TabularInline):
    model = Role
    extra = 1


class ArtistAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Роли', {'fields': ['roles'], 'classes': ['collapse']}),
    ]


class SpectacleAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {
            'fields': ['name', 'description', 'genre', 'premiere_date', 'close_date', 'is_premiere',]
        }),
        ('Рейтинг', {
            'fields': ['rating_yes', 'rating_no'], 'classes': ['collapse']
        }),
        ('Позиция / Публикация', {
            'fields': ['position', 'publication'], 'classes': ['collapse']
        }),
    ]
    list_display = ('name', 'genre', 'premiere_date', 'close_date', 'is_premiere')
    ...


admin.site.register(Role)
admin.site.register(Genre)
admin.site.register(Spectacle, SpectacleAdmin)
admin.site.register(Artist, ArtistAdmin)