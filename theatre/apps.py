from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _

class TheatreConfig(AppConfig):
    name = 'theatre'
    verbose_name = _('Theatre')
