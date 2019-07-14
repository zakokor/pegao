from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.utils.text import slugify

#Transactions classes
class User(AbstractUser):
    country = models.CharField(max_length=30)
    language = models.CharField(max_length=2)
    photo = models.ImageField(upload_to='photo/',null=True)

class Follower(models.Model):
    class Meta:
        unique_together = ['user', 'follower'] #para que no pueda existir mas de un registro de una relacion ya creada

    STATUSES = (
        ('following', 'following'),
        ('unfollow', 'unfollow'),
    )

    id = models.AutoField(primary_key=True)

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='users')
    follower = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='followers')
    status = models.CharField(max_length=10, choices=STATUSES, default='follow')

    created_at = models.DateTimeField(auto_now_add=True)

class Suscription(models.Model):
    STATUSES = (
        ('follow', 'follow'),
        ('unfollow', 'unfollow'),
    )

    id = models.AutoField(primary_key=True)

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    source = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUSES, default='follow')

    created_at = models.DateTimeField(auto_now_add=True)

class Post(models.Model):
    STATUSES = (
        ('active', 'active'),
        ('removed', 'removed'),
        ('blocked', 'blocked'),
    )

    id = models.AutoField(primary_key=True)

    link = models.CharField(max_length=200)
    image = models.CharField(null=True,max_length=200)
    ico = models.CharField(null=True,max_length=100)
    emoji = models.CharField(null=True,max_length=100)
    text = models.TextField()
    slug = models.SlugField(default='',editable=False,max_length=200)
    tags = models.CharField(null=True,max_length=100)
    votes = models.SmallIntegerField(default=0)
    views = models.SmallIntegerField(default=0)
    repost = models.SmallIntegerField(default=0)
    badge = models.SmallIntegerField(null=True)
    points = models.SmallIntegerField(default=5)
    status = models.CharField(max_length=10, choices=STATUSES, default='active')
    list = models.CharField(null=True,max_length=30)

    #channel = models.ForeignKey('Channel',on_delete=models.CASCADE, related_name='channels')
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='authors')

    created_at = models.DateTimeField(auto_now_add=True,db_index=True)

    def get_absolute_url(self):
        return '/noticia/'+self.slug #reverse('post', args=[str(self.id)])

    """def get_absolute_url(self):
        kwargs = {
            'pk': self.id,
            'slug': self.title_slug
        }
        #return reverse('article-pk-slug-detail', kwargs=kwargs)
        return reverse('slug', kwargs=kwargs)"""

    def save(self, *args, **kwargs):
        value = self.text
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)

class Activity(models.Model):
    STATUSES = (
        ('vote', 'vote'),
        ('viewed', 'viewed'),
        ('repost', 'repost'),
        ('mark', 'mark'),
        ('hide', 'hide'),
        ('spam', 'spam'),
        ('ilegal', 'ilegal'),
    )

    id = models.AutoField(primary_key=True)

    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    status = models.CharField(max_length=10, choices=STATUSES)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'user', 'status')
