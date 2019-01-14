from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from django.views.generic import TemplateView, DetailView, ListView

import traceback
import sys

from .models import Artist, Performance, Poster
from menu.models import MenuItem

# from django.shortcuts import get_object_or_404, render

def get_menu(**kwargs):
        # return MenuItem.objects.filter(menu='main menu').order_by('order')
        return MenuItem.objects.order_by('order')


class HomePageView(TemplateView):
    template_name = 'base/index.html'

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['artists'] = self.get_artists()
        context['performances'] = self.get_performances()
        context['posters'] = self.get_posters()
        context['news'] = self.get_news()
        context['main_menu'] = get_menu()
        return context

    def get_artists(self, **kwargs):
        return Artist.objects.order_by('last_name')[:5]

    def get_performances(self, **kwargs):
        return 5

    def get_posters(self, **kwargs):
        return 5

    def get_news(self, **kwargs):
        return 5


class Contacts(TemplateView):
    template_name = 'contacts.html'
    
    def get_context_data(self, **kwargs):
        context = super(Contacts, self).get_context_data(**kwargs)
        context['main_menu'] = get_menu()

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


class PosterList(ListView):
    model = Poster
    context_object_name = "poster_list"

    def get_context_data(self, **kwargs):
        context = super(PosterList, self).get_context_data(**kwargs)
        context['poster_list'] = self.get_poster_list()
        context['main_menu'] = get_menu()
        return context

    def get_poster_list(self, **kwargs):
        poster_list = Poster.objects.all()
        return poster_list