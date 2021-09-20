from django.urls import include, path, re_path
from django.views.generic import TemplateView

from .views import (
    HomePage,
    FestivalPageView,
    ArtistDetail, ArtistList,
    PosterList,
    Contacts,
    PerformanceDetail, PerformanceList,
    # Unifest,
    # STFest,
)

from .models import FestivalPage

app_name = 'theatre'
fest_slug = FestivalPage.objects.filter(publication=True).first().slug

urlpatterns = [
    path('', HomePage.as_view()),
    path('performance/', PerformanceList.as_view(), name='performance'),
    path('performance/<slug:slug>/', PerformanceDetail.as_view(), name='performance_detail'),
    path('artist/', ArtistList.as_view(), name='artist'),
    path('artist/<slug:slug>/', ArtistDetail.as_view(), name='artist_detail'),
    path('poster/', PosterList.as_view(), name='poster'),
    path('p/', include('django.contrib.flatpages.urls')),
    # path('unifest/', Unifest.as_view(), name='unifest'),
    path(f'{fest_slug}/', FestivalPageView.as_view(), name=fest_slug),
    path('contacts/', Contacts.as_view(), name='contacts'),
]
