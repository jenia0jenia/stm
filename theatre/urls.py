from django.urls import include, path, re_path
from django.views.generic import TemplateView

from .views import (
    HomePage,
    ArtistDetail, ArtistList,
    PosterList,
    Contacts,
    PerformanceDetail, PerformanceList,
    # Unifest,
    STFest,
)

app_name = 'theatre'

urlpatterns = [
    path('', HomePage.as_view()),
    path('performance/', PerformanceList.as_view(), name='performance'),
    path('performance/<slug:slug>/', PerformanceDetail.as_view(), name='performance_detail'),
    path('artist/', ArtistList.as_view(), name='artist'),
    path('artist/<slug:slug>/', ArtistDetail.as_view(), name='artist_detail'),
    path('poster/', PosterList.as_view(), name='poster'),
    path('p/', include('django.contrib.flatpages.urls')),
    # path('unifest/', Unifest.as_view(), name='unifest'),
    path('stfest/', STFest.as_view(), name='stfest'),
    path('contacts/', Contacts.as_view(), name='contacts'),
]
