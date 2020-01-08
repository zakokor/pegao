from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.conf import settings

def index(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}

  if request.user.is_authenticated:
    return render(request, 'app/index.html', context)
  else:
    return render(request, 'index.html', context)

#@login_required
def profile(request,pk):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )

#@login_required
def profilelist(request,pk,list):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )

#@login_required
def profileemoji(request,pk,emoji):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )
  
#@login_required
def following(request,pk):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )

@login_required
def submit(request,url):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )

def terms(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "terms.html", context )

def privacy(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "privacy.html", context )

#articles
def tour(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "articles/tour.html", context )

def getting_started(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "articles/how-do-i-paste-a-link.html", context )
