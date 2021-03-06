from django.urls import path #, re_path
from . import views

urlpatterns = [
  #articles
  path('tour', views.tour ),
  path('getting-started', views.getting_started ),

  path('http<path:url>', views.submit ),
  #re_path(r'^(?P<url>.*)/$', views.submit ),
  #re_path(r'^(http|http(s)\?://[\w-]+\.)+(?P<url>)?', views.submit ),

  #^(http|http(s)?://)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?
  #re_path(r'^http(?P<url>.*)?(?P<url2>[\?%&=]*)/$', views.submit ),#/(?P<month>[0-9]{2})/(?P<slug>[\w-]+)/$
  #path('https://emojipedia.org/search/?q=round_pushpin<path:url>', views.submit ),

  path('@<str:pk>/following', views.following ),
  path('@<str:pk>/list/<str:list>', views.profilelist ),
  path('@<str:pk>/lists', views.profile ),
  path('@<str:pk>/emoji/<str:emoji>', views.profileemoji ),
  path('@<str:pk>', views.profile ),

  path('', views.index ),
  path('home', views.index ),

  path('terms', views.terms ),
  path('privacy', views.privacy ),

]
