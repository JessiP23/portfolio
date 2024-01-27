from django import forms
from .models import ContactInformation

class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactInformation
        fields = ['name', 'email', 'message']