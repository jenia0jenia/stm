from django import template

register = template.Library()


@register.simple_tag
def get_verbose_field_name(instance, field_name):
    """
    Returns verbose_name for a field.
    """
    return instance._meta.get_field(field_name).verbose_name.title()



# @register.inclusion_tag('include/main_menu.html')
# def main_menu():
#     menu_list = MenuItem.objects.all()
#     return {
#         'menu_list': menu_list
#     }
