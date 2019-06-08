from django import forms
from django.utils.translation import gettext as _

from .models import URequest

class URequestForm(forms.Form):

    name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': _('Name')}), max_length=100)
    phone = forms.CharField(widget=forms.TextInput(attrs={'placeholder': _('Phone')}), max_length=100)
    email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': _('E-mail')}), max_length=100)
    file = forms.FileField()
    message = forms.CharField(widget=forms.Textarea(attrs={'placeholder': _('Message')}), max_length=1000, required=False)

    # class Meta:
    #     model = URequest
    #     fields = ('name', 'phone', 'email', 'file', 'message')
