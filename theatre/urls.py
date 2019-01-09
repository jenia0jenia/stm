from django.urls import path
from django.views.generic import TemplateView

from .views import HomePageView, ArtistDetail, ArtistList

app_name = 'theatre'

urlpatterns = [
    path('robots.txt', TemplateView.as_view(template_name="theatre/robots.txt", content_type='text/plain')),
    path('artist/<int:pk>/', ArtistDetail.as_view(template_name="theatre/artist_index.html"), name='artist_detail'),
    path('artist/', ArtistList.as_view(template_name="theatre/artist_list.html"), name='artist_list'),
    path('', HomePageView.as_view(), name='index'),
]