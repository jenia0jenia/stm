from django.db import models
from django.core.mail import EmailMessage
from collections.abc import Iterable
from django.utils.translation import gettext as _


class IntegerRangeField(models.IntegerField):
    """ From min_value to max_value """
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value': self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)


def send_email(from_mail, to_mail, msg='', file=False, theme=_("New letter fron maneken.studio")):
    email = EmailMessage(
        theme,
        msg,
        from_mail,
        to_mail,
    )

    if file:
        email.attach_file(file)

    email.send()

def get_request_param(request, param, default=None):
    return request.POST.get(param) or request.GET.get(param, default)
