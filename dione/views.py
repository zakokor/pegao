from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect

def index(request):
    return render(request, 'app/index.html')
  
    """if request.user.is_authenticated:
      return render(request, 'app/index.html')
    else:
      return render(request, 'index.html')
    """

#@login_required
def profile(request,pk):
    return render(request, 'app/index.html')

#@login_required
def profilelist(request,pk,list):
    return render(request, 'app/index.html')

#@login_required
def profileemoji(request,pk,emoji):
    return render(request, 'app/index.html')
  
#@login_required
def following(request,pk):
    return render(request, 'app/index.html')

@login_required
def submit(request,url):
    return render(request, 'app/index.html')

"""@login_required
def community(request,pk):
    return render(request, 'app/index.html')
"""    

def terms(request):
      return render(request, 'terms.html')

def privacy(request):
      return render(request, 'privacy.html')

#articles
def tour(request):
      return render(request, 'articles/tour.html')

def getting_started(request):
      return render(request, 'articles/how-do-i-paste-a-link.html')
