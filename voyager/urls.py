"""voyager URL Configuration
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.views import LoginView, LogoutView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('admin/', admin.site.urls),

  path('login/', LoginView.as_view(), name='login'),
  path('logged-out/', LogoutView.as_view(), name='logout'),

  path('', include('social_django.urls', namespace='social')),

  path('', include('hiperion.urls')),
  path('', include('dione.urls')),
]

#permite ver en desarrollo la foto colocando la url en el navegador ej. http://xxxx/media/photo/zakokor.jpg
#en produccion los archivos los sirve NGINX
if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
