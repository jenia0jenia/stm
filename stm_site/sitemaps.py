from django.urls import reverse
from django.contrib.sitemaps import Sitemap
from django.apps import apps as django_apps
from django.core.exceptions import ImproperlyConfigured

from theatre.models import Artist, Performance, Poster
from theatre.views import ArtistDetail, PerformanceDetail

class ArtistSitemap(Sitemap):
    changefreq = 'monthly'
    priority = 0.7

    def items(self):
        return Artist.objects.all()

    def location(self, item):
        return reverse('theatre:artist_detail', kwargs={'slug': item.slug})


class PerformanceSitemap(Sitemap):
    changefreq = 'monthly'
    priority = 0.9

    def items(self):
        return Performance.objects.all()

    def location(self, item):
        return reverse('theatre:performance_detail', kwargs={'slug': item.slug})


class StaticViewSitemapReverse(Sitemap):

    def items(self):
        return ['performance', 'artist', 'poster', 'unifest', 'contacts', ]

    def location(self, item):
        return reverse(f'theatre:{item}')


class StaticViewSitemap(Sitemap):

    def items(self):
        return ['']

    def location(self, item):
        return item


class FlatPageSitemap(Sitemap):
    def items(self):
        if not django_apps.is_installed('django.contrib.sites'):
            raise ImproperlyConfigured("FlatPageSitemap requires django.contrib.sites, which isn't installed.")
        Site = django_apps.get_model('sites.Site')
        current_site = Site.objects.get_current()
        return current_site.flatpage_set.filter(registration_required=False)

    def location(self, item):
        return f'/p{item.url}'

# class PosterSitemap(Sitemap):
#     changefreq = 'monthly'
#     priority = 0.9

#     def items(self):
#         return Poster.objects.all()

#     def location(self, item):
#         return reverse('theatre:poster_detail', kwargs={'slug': item.slug})