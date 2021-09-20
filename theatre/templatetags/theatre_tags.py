from django import template
from stm_site.models import Properties
from theatre.models import FestivalPage

register = template.Library()


@register.simple_tag
def get_verbose_field_name(instance, field_name):
    """
    Returns verbose_name for a queryobject field.
    """
    return instance._meta.get_field(field_name).verbose_name.title()


@register.simple_tag
def get_propertie(prop_name):
    """
    Returns value of property.
    """
    p = Properties.objects.filter(name=prop_name)
    return p.first().value if p else ''


@register.simple_tag
def get_festival():
    """
    Returns festival.
    """
    return FestivalPage.objects.filter(publication=True).first()


# @register.inclusion_tag('include/main_menu.html')
# def main_menu():
#     menu_list = MenuItem.objects.all()
#     return {
#         'menu_list': menu_list
#     }
