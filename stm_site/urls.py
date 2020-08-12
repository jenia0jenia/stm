"""stm_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.contrib.sitemaps.views import sitemap
from django.urls import re_path, path, include
# from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static

from filebrowser.sites import site
from .sitemaps import ArtistSitemap, PerformanceSitemap, StaticViewSitemap, StaticViewSitemapReverse, FlatPageSitemap

app_name = 'stm_site'

sitemaps = {
    'static': StaticViewSitemap,
    'static_reverse': StaticViewSitemapReverse,
    'artist': ArtistSitemap,
    'performance': PerformanceSitemap,
    'flatpages': FlatPageSitemap,
}

urlpatterns = [
    # re_path(r'^robots.txt$', TemplateView.as_view(template_name="base/robots.txt", content_type='text/plain')),
    path('admin/', admin.site.urls),
    path('', include('theatre.urls'), name='theatre'),
    # path('polls/', include('polls.urls')),
    path('admin/filebrowser/', site.urls),
    path('tinymce/', include('tinymce.urls')),
    path('content_gallery/', include('content_gallery.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap')
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
