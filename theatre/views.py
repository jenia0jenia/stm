from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
# from django.shortcuts import get_object_or_404, render

def index(request):
    output = 'hello world'
    return HttpResponse(output)