from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.db import models
# from django.shortcuts import get_object_or_404, render

def index(request):
    output = 'hello world'
    return HttpResponse(output)


class IntegerRangeField(models.IntegerField):
    """ От min_value до max_value """
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value': self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)