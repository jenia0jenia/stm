from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.views.generic import TemplateView, DetailView, ListView

import traceback
import sys

from .models import Artist, Performance, Poster

# from django.shortcuts import get_object_or_404, render

class HomePageView(TemplateView):
    # template_name = 'base/index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['artists'] = self.get_artists()
        context['performances'] = self.get_performances()
        context['posters'] = self.get_posters()
        context['news'] = self.get_news()
        # print(context)
        return context

    def get_artists(self, **kwargs):
        # return 5
        return Artist.objects.order_by('last_name')[:5]

    def get_performances(self, **kwargs):
        return 5

    def get_posters(self, **kwargs):
        return 5

    def get_news(self, **kwargs):
        return 5


class ArtistDetail(DetailView):
    model = Artist
    context_object_name = "artist"

    def get_object(self, queryset=None):
        obj = super(ArtistDetail, self).get_object()
        obj.viewed()
        self.object = obj
        return obj

    def get_context_data(self, **kwargs):
        context = super(ArtistDetail, self).get_context_data(**kwargs)
        context['artists'] = self.get_artists()
        return context

    def get_artists(self, **kwargs):
        artists = Artist.objects.order_by('?')[:5]
        return artists


class ArtistList(ListView):
    model = Artist
    context_object_name = "artists"

    def get_context_data(self, **kwargs):
        context = super(ArtistList, self).get_context_data(**kwargs)
        context['artists'] = self.get_artists()
        return context

    def get_artists(self, **kwargs):
        artists = Artist.objects.order_by('last_name')
        return artists