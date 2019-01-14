from django import template

from menu.models import Menu, MenuItem

register = template.Library()

@register.inclusion_tag('include/main_menu.html')
def main_menu():
    menu_list = MenuItem.objects.all()
    return {
        'menu_list': menu_list
    }