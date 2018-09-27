from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'theatre'
urlpatterns = [
    path('robots.txt', TemplateView.as_view(template_name="theatre/robots.txt", content_type='text/plain')),
    path('', views.index, name='index'),
]