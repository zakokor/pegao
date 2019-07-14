from urllib.request import urlopen
from django.core.files.base import ContentFile

def get_avatar(backend, strategy, details, response,
        user=None, *args, **kwargs):
    
    if not kwargs['is_new']:
        return
      
    url = None
    """if backend.name == 'facebook':
        url = "http://graph.facebook.com/%s/picture?type=large"%response['id']
    if backend.name == 'twitter':
        url = response.get('profile_image_url', '').replace('_normal','')"""
    
    if backend.name == 'google-oauth2':
        if 'picture' in response and  'sub' in response:
          url = response['picture']
          image_name = response['sub']
          image_ext = url.split('.')[-1]
    if url:
        user.photo.save(
               #image_name, #'{0}.{1}'.format('photo', image_ext),
               '{0}.{1}'.format(image_name, image_ext),
               ContentFile(urlopen(url).read()),
               save=False
            )
        user.save()
       
