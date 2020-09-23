from django.db import models
from django.utils.translation import gettext as _


class Properties(models.Model):
    name = models.CharField(_('Name'), max_length=100)
    value = models.CharField(_('Value'), max_length=250)
    addition_value = models.CharField(_('Additional value'), max_length=250, blank=True)

    class Meta:
        verbose_name = _('Propertie')
        verbose_name_plural = _('Properties')

    def __str__(self):
        return self.name
