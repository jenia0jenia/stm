from django import forms
from .models import URequest

class URequestForm(forms.ModelForm):

    class Meta:
        model = URequest
        fields = ('name', 'phone', 'email', 'message')
