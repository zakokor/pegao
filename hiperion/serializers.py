from rest_framework import serializers
from hiperion.models import *
from django.db.models import F

"""class AccountSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    def get_username(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return obj.username

    class Meta:
        model = User
        fields = ('username','location','language','photo')
"""
        
class UserSerializer(serializers.ModelSerializer):

    fullname = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    def get_fullname(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return ' '.join(filter(bool, (obj.first_name, obj.last_name)))

    def get_username(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return obj.username

    class Meta:
        model = User
        fields = ('username','location','language','photo','cover','fullname','about','team_flag')

#Consultar el listado de listas por usuario
class UserListSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    def get_username(self, obj): #se ejecuta en el GET para traer el nombre de usuario
        return obj.author.username

    class Meta:
        model = Post
        fields = ('username','list', )

#listar las comunidades a las que pertence un usuario
"""class MemberSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()
    community_name = serializers.SerializerMethodField()
    community_slug = serializers.SerializerMethodField()

    def get_username(self, obj): #se ejecuta en el GET para traer el nombre de usuario
        return obj.user.username

    def get_community_name(self, obj): #se ejecuta en el GET para traer el nombre de usuario
        return obj.community.name

    def get_community_slug(self, obj): #se ejecuta en el GET para traer el nombre de usuario
        return obj.community.slug

    class Meta:
        model = Member
        #fields = '__all__'
        exclude = ('id','user','community' )
"""

class FollowerSerializer(serializers.ModelSerializer):

    follower = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    def get_follower(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return obj.follower.username
    def get_following(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return obj.user.username

    class Meta:
        model = Follower
        #fields = '__all__'
        exclude = ('id','user', )


class PostSerializer(serializers.ModelSerializer):

    fullname = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    photo = serializers.SerializerMethodField()
    viewed = serializers.SerializerMethodField()
    voted = serializers.SerializerMethodField()
    reposted = serializers.SerializerMethodField()

    def get_fullname(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return ' '.join(filter(bool, (obj.author.first_name, obj.author.last_name)))

    def get_username(self, obj): #se ejecuta en el GET para traer el nombre de usuario
        return obj.author.username

    def get_photo(self, obj): #se ejecuta en el GET para traer la foto de usuario
        if obj.author.photo:
          return obj.author.photo.url
        else:
          return None

    def get_viewed(self, obj): #se ejecuta en el GET para traer si el usuario ya visito el post
        viewed = False

        if self.context['request'].user.is_authenticated:
          activity = Activity.objects.filter(post=obj.id,status='viewed',user=self.context['request'].user).count()
          if activity > 0:
              viewed = True

        return viewed

    def get_reposted(self, obj): #se ejecuta en el GET para traer si el usuario ya voto por el post
        reposted = False
        
        if self.context['request'].user.is_authenticated:
          activity = Activity.objects.filter(post=obj.id,status='repost',user=self.context['request'].user).count()
          if activity > 0:
              reposted = True

        return reposted

    def get_voted(self, obj): #se ejecuta en el GET para traer si el usuario ya voto por el post
        voted = False

        if self.context['request'].user.is_authenticated:
          activity = Activity.objects.filter(post=obj.id,status='vote',user=self.context['request'].user).count()
          if activity > 0:
              voted = True

        return voted
    
    class Meta:
        model = Post
        exclude = ('author', )
        read_only_fields = ('votes','views','repost','badge','points','status','author','list')
        #ordering = ['-votes']#'-created_at',

class ActivityViewSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    def get_username(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return obj.user.username

    class Meta:
        model = Activity

        exclude = ('user', )

    def create(self, validated_data): #guardar un voto nuevo
        activity, created = Activity.objects.get_or_create(**validated_data) #si no existe lo crea (created=true), de lo contrario lo devuelve (created=false)

        if created: #si se creo un voto nuevo, suma + 1 en el post
            post = Post.objects.select_related().filter(id=self.initial_data.get("post")).update(views=F('views')+1)

        return activity

class ActivityVoteSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    def get_username(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return obj.user.username

    class Meta:
        model = Activity

        exclude = ('user', )

    def create(self, validated_data): #guardar un voto nuevo
        activity, created = Activity.objects.get_or_create(**validated_data) #si no existe lo crea (created=true), de lo contrario lo devuelve (created=false)

        if created: #si se creo un voto nuevo, suma + 1 en el post
            post = Post.objects.select_related().filter(id=self.initial_data.get("post")).update(votes=F('votes')+1)

        return activity

class ActivityRePostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField()

    def get_username(self, obj): #se ejecuta en el GET para trer el nombre de usuario
        return obj.user.username

    class Meta:
        model = Activity

        exclude = ('user', )

    def create(self, validated_data): #guardar un voto nuevo
        activity, created = Activity.objects.get_or_create(**validated_data) #si no existe lo crea (created=true), de lo contrario lo devuelve (created=false)

        if created: #si se creo un voto nuevo, suma + 1 en el post
            post = Post.objects.select_related().filter(id=self.initial_data.get("post")).update(repost=F('repost')+1)

        return activity
