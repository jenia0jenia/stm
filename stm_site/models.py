from django.db import models
from django.utils.translation import gettext as _


class Properies(models.Model):
    name = models.CharField(_('Name'), max_length=100)
    value = models.CharField(_('Value'), max_length=250)

    class Meta:
        verbose_name = _('Properie')
        verbose_name_plural = _('Properies')

    def __str__(self):
        return self.name
