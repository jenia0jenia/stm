
import os

import logging
# import sys
# import traceback

# from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse

from django.shortcuts import render
from django.views.generic import TemplateView, DetailView, ListView
from django.views.generic.edit import FormView
from django.conf import settings
from django.db.models import Q
from collections.abc import Iterable

# from django.core.files import File
# from django.core.files.storage import FileSystemStorage

from .models import FestivalPage, Artist, Performance, Poster
from .forms import URequestForm, UMemberForm
from .utils import send_email, get_request_param

from django.utils.translation import gettext as _

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
        context['fest'] = FestivalPage.objects.filter(publication=True).first()
        return context

    def get_artist_list(self, **kwargs):
        return Artist.objects\
            .filter(publication=True)\
            .order_by('?')[:7]

    def get_performance_list(self, **kwargs):
        return Performance.objects\
            .filter(publication=True, is_archive=False)\
            .order_by('order')[:4]

    def get_poster_list(self, **kwargs):
        return Poster.objects.filter(publication=True)[:10]

    def get_news(self, **kwargs):
        return 5


class FestivalPageView(TemplateView):
    template_name = 'fest.html'

    def get_context_data(self, **kwargs):
        context = super(FestivalPageView, self).get_context_data(**kwargs)
        context['fest'] = FestivalPage.objects.filter(publication=True).first()
        return context


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
        slug = self.kwargs['slug']
        perf = Performance.objects\
            .filter(Q(publication=True))\
            .order_by('order')

        context['as_director'] = perf.filter(Q(director__slug=slug))
        context['as_light'] = perf.filter(Q(light__slug=slug))
        context['as_sound'] = perf.filter(Q(sound__slug=slug))
        context['as_painter'] = perf.filter(Q(painter__slug=slug))
        context['as_artist_list'] = perf.filter(Q(artists__slug=slug))

        return context

    def get_artist_list(self, **kwargs):
        artist_list = Artist.objects\
            .filter(publication=True)\
            .order_by('?')[:5]
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
        artist_list = Artist.objects\
            .filter(publication=True)\
            .order_by('order')
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
        poster_list = Poster.objects\
            .filter(publication=True)\
            .order_by('order')
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
        slug = self.kwargs['slug']
        performance = Performance.objects.get(slug=slug)

        context['performance'] = performance
        context['director'] = performance.director.all()
        context['light'] = performance.light.all()
        context['sound'] = performance.sound.all()
        context['painter'] = performance.painter.all()
        context['artist_list'] = performance.artists.all()
        context['performance_list'] = Performance.objects\
            .exclude(slug=slug)\
            .filter(Q(is_archive=False) & Q(publication=True))\
            .order_by('?')[:5] # random 5
        return context


class PerformanceList(ListView):
    model = Performance
    context_object_name = "performance_list"
    template_name = "performance_list.html"

    def get_context_data(self, **kwargs):
        context = super(PerformanceList, self).get_context_data(**kwargs)
        context['performance_list'] = self.get_performance_list()
        context['performance_list_archive'] = self.get_performance_list_archive()
        return context

    def get_performance_list(self, **kwargs):
        performance_list = Performance.objects\
            .filter(Q(is_archive=False) & Q(publication=True))\
            .order_by('order')
        return performance_list

    def get_performance_list_archive(self, **kwargs):
        performance_list = Performance.objects\
            .filter(Q(is_archive=True) & Q(publication=True))\
            .order_by('order')
        return performance_list

