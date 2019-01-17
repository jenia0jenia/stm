from django.urls import include, path, re_path
from django.views.generic import TemplateView

from .views import HomePageView, ArtistDetail, ArtistList, PosterList, Contacts

app_name = 'theatre'

urlpatterns = [
    re_path(r'^robots.txt$', TemplateView.as_view(template_name="base/robots.txt", content_type='text/plain')),
    re_path(r'^.*$', TemplateView.as_view(template_name="base/stub.html")),
    # re_path(r'^poster/$', PosterList.as_view(template_name="theatre/poster_list.html"), name='poster_list'),
    # path('artist/<int:pk>/', ArtistDetail.as_view(template_name="theatre/artist_index.html"), name='artist_detail'),
    # re_path(r'^artist/$', ArtistList.as_view(template_name="theatre/artist_list.html"), name='artist_list'),
    # re_path(r'^$', HomePageView.as_view(), name='index'),
    # re_path(r'^contacts/$', Contacts.as_view(), name='contacts'),
]