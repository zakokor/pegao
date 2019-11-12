from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.conf import settings

def index(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )

  #return render(request, 'app/index.html')

  """if request.user.is_authenticated:
    return render(request, 'app/index.html')
  else:
    return render(request, 'index.html')
  """

#@login_required
def profile(request,pk):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )
  #return render(request, 'app/index.html')

#@login_required
def profilelist(request,pk,list):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )
  #return render(request, 'app/index.html')

#@login_required
def profileemoji(request,pk,emoji):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )
  #return render(request, 'app/index.html')
  
#@login_required
def following(request,pk):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )
  #return render(request, 'app/index.html')

@login_required
def submit(request,url):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "app/index.html", context )
  #return render(request, 'app/index.html')

"""@login_required
def community(request,pk):
    return render(request, 'app/index.html')
"""    

def terms(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "terms.html", context )
  #return render(request, 'terms.html')

def privacy(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "privacy.html", context )
  #return render(request, 'privacy.html')

#articles
def tour(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "articles/tour.html", context )
  #return render(request, 'articles/tour.html')

def getting_started(request):
  debug_flag = settings.DEBUG
  context = {'debug_flag':debug_flag}
  return render(request, "articles/how-do-i-paste-a-link.html", context )
  #return render(request, 'articles/how-do-i-paste-a-link.html')
