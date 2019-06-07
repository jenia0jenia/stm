import logging
# import sys
# import traceback

# from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.views.generic import TemplateView, DetailView, ListView


from .models import Artist, Performance, Poster

# logger = logging.getLogger('logfile')

# from django.shortcuts import get_object_or_404, render

class HomePage(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePage, self).get_context_data(**kwargs)
        context['artist_list'] = self.get_artist_list()
        context['performance_list'] = self.get_performance_list()
        context['poster_list'] = self.get_poster_list()
        context['news'] = self.get_news()
        return context

    def get_artist_list(self, **kwargs):
        return Artist.objects.order_by('last_name').filter(publication=True)[:5]

    def get_performance_list(self, **kwargs):
        return Performance.objects.order_by('name').filter(publication=True)[:5]

    def get_poster_list(self, **kwargs):
        return Poster.objects.filter(publication=True)[:5]

    def get_news(self, **kwargs):
        return 5


class Contacts(TemplateView):
    template_name = 'contacts.html'

    def get_context_data(self, **kwargs):
        context = super(Contacts, self).get_context_data(**kwargs)


class ArtistDetail(DetailView):
    model = Artist
    context_object_name = "artist"
    template_name = "artist_detail.html"

    def get_object(self, queryset=None):
        obj = super(ArtistDetail, self).get_object()
        obj.viewed()
        self.object = obj
        return obj

    def get_context_data(self, **kwargs):
        context = super(ArtistDetail, self).get_context_data(**kwargs)
        context['artists'] = self.get_artist_list()
        return context

    def get_artist_list(self, **kwargs):
        artist_list = Artist.objects.order_by('?')[:5]
        return artist_list


class ArtistList(ListView):
    model = Artist
    context_object_name = "artist_list"
    template_name = "artist_list.html"

    def get_context_data(self, **kwargs):
        context = super(ArtistList, self).get_context_data(**kwargs)
        context['artist_list'] = self.get_artist_list()
        return context

    def get_artist_list(self, **kwargs):
        artist_list = Artist.objects.order_by('last_name').filter(publication=True)
        return artist_list


class PosterList(ListView):
    model = Poster
    context_object_name = "poster_list"
    template_name = "poster_list.html"

    def get_context_data(self, **kwargs):
        context = super(PosterList, self).get_context_data(**kwargs)
        context['poster_list'] = self.get_poster_list()
        return context

    def get_poster_list(self, **kwargs):
        poster_list = Poster.objects.filter(publication=True)
        return poster_list


class PerformanceDetail(DetailView):
    model = Performance
    context_object_name = "performance"
    template_name = "performance_detail.html"

    # def get_object(self, queryset=None):
    #     print('get_object')
    #     print(queryset)
    #     obj = super(PerformanceDetail, self).get_object()
    #     obj.viewed()
    #     self.object = obj
    #     return obj

    def get_context_data(self, **kwargs):
        context = super(PerformanceDetail, self).get_context_data(**kwargs)
        context['performance_list'] = self.get_performance_list()
        return context

    def get_performance_list(self, **kwargs):
        slug = self.kwargs['slug']
        performance_list = Performance.objects.exclude(slug=slug).order_by('?')[:5] # random
        return performance_list


class PerformanceList(ListView):
    model = Performance
    context_object_name = "performance_list"
    template_name = "performance_list.html"

    def get_context_data(self, **kwargs):
        context = super(PerformanceList, self).get_context_data(**kwargs)
        context['performance_list'] = self.get_performance_list()
        return context

    def get_performance_list(self, **kwargs):
        performance_list = Performance.objects.order_by('name')
        return performance_list


class Unifest(TemplateView):
    template_name = 'unifest.html'
