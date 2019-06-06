from django import template

register = template.Library()

# @register.inclusion_tag('include/main_menu.html')
# def main_menu():
#     menu_list = MenuItem.objects.all()
#     return {
#         'menu_list': menu_list
#     }