#from django.shortcuts import render

from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from urllib.request import urlopen, Request
from urllib.parse import urlsplit, quote, urlunsplit
from bs4 import BeautifulSoup
from django.shortcuts import get_object_or_404
import re

from hiperion.models import *
from hiperion.serializers import *

import requests

class Submit(APIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    renderer_classes = (JSONRenderer, )

    def get(self, request, format=None):
        #print("hola1",self.request.query_params)

        url = self.request.query_params.get('url')
        #print("url",url)

        #inicio para link con caracteres especiales como tildes, etc
        url = urlsplit(url)
        #print("url1",url)
        url = list(url)
        #print("url2",url)
        url[2] = quote(url[2])
        #print("url3",url)
        url = urlunsplit(url)
        print("url4",url)
        #fin para link con caracteres especiales como tildes, etc

        """
        #inicio metodo 1
        #para paginas que piden un agente y no genere HTTP Error 403: Forbidden
        req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        #req = Request(url, headers=headers)

        #html = urlopen(url)
        html = urlopen(req) #.read()
        #print("html",html)

        soup = BeautifulSoup(html, 'html.parser')
        print("soup.title",soup.title)
        print("find title",soup.find('title'))
        #fin metodo 1
        """

        #inicio metodo 2
        headers = requests.utils.default_headers()
        headers.update({
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
        })

        r = requests.get(url, headers)
        raw_html = r.content
        #print("raw_html",raw_html)
        soup = BeautifulSoup(raw_html, 'html.parser')
        #fin metodo 2

        if soup.title:
          content = {'url': url, 'title': soup.title.string }
        else:
          content = {'url': url, 'title': '' }


        #content = {'url': url, 'title': soup.title.string }
        return Response(content)
        #return Response({})

class PostListCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = PostSerializer

    def perform_create(self, serializer): #se ejecuta en el POST para crear una publicacion

        #print("text",self.request.data["text"])

        list = re.findall(r"(?:^|\s)[/]{1}(\w+)", self.request.data["text"], re.UNICODE) #debe iniciar despues de un espacio por ej. mi carro /hola
        #list = re.findall(r"/(\w+)", self.request.data["text"], re.UNICODE) #no importa si no tiene un espacio al principio por ej. mi carro/hola
        #print("findall",list)
        #print("list",list[len(list)-1] if len(list) > 0 else None)

        serializer.save(
            author=self.request.user, list=list[len(list)-1] if len(list) > 0 else None) #,emoji=":%s:" % self.request.data["emoji"])

    def get_queryset(self): #consultar

        #print(target)
        #print('user',self.request.user)

        user_id = self.request.user

        if self.kwargs is not None and 'username' in self.kwargs:
          print('username',self.kwargs["username"])

          user_id = User.objects.get(username=self.kwargs["username"])
          #print('user_id',user_id.id)
          #print(user_id.query)

        queryset = Post.objects.filter(author=user_id).order_by('-created_at','-votes')


        #follower_ids = Follower.objects.filter(follower=self.request.user).values_list('user',flat=True)
        follower_ids = Follower.objects.filter(follower=user_id).values_list('user',flat=True)
        #print(follower_ids)
        #print(follower_ids.query)

        suscription_ids = Suscription.objects.filter(user=user_id).values_list('source',flat=True)
        #print(follower_ids)
        #print(follower_ids.query)

        if follower_ids:
            #print("hola follower_ids")
            queryset = queryset | Post.objects.filter(author_id__in=follower_ids)

            #print('query:',queryset.query)
            #print('query:',queryset.explain(verbose=True))

        if suscription_ids:
            #print("hola suscription_ids")

            queryset = queryset | Post.objects.filter(link__contains=suscription_ids)
            #print('query2:',queryset.query)

        return queryset

    """def dispatch(self, *args, **kwargs):
        response = super().dispatch(*args, **kwargs)
        # For debugging purposes only.
        from django.db import connection

        print('# of Queries: {}'.format(len(connection.queries)))
        #for query in connection.queries:
        #    print(query['sql'])

        return response """

class PostUserList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = PostSerializer

    def get_queryset(self): #consultar

        """
        print("PostUserList")
        print('username',self.kwargs["username"])
        print('list',self.kwargs["list"])
        """

        #user_id = self.request.user

        if self.kwargs is not None and ('username' and 'list') in self.kwargs:
          print("filtro")

          user_id = User.objects.get(username=self.kwargs["username"])
          list_id = self.kwargs["list"]

        queryset = Post.objects.filter(author=user_id,list=list_id).order_by('-created_at','-votes')

        return queryset


class PostActivityView(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = ActivityViewSerializer

    def perform_create(self, serializer): #se ejecuta en el POST para crear una publicacion
        serializer.save(
            user=self.request.user)

class PostActivityVote(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = ActivityVoteSerializer

    def perform_create(self, serializer): #se ejecuta en el POST para crear una publicacion
        serializer.save(
            user=self.request.user)

class PostActivityVoteDestroy(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = ActivityVoteSerializer

    def get_object(self): #para sobreescribir el parametro pk por el filtro implementado en get_queryset
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset)

        return obj

    def get_queryset(self): #busca el registro con el filtro personalizado

        queryset = Activity.objects.filter(post=self.kwargs["post"],status='vote',user=self.request.user)

        return queryset

    def destroy(self, request, *args, **kwargs): #elimina un voto
        try:
            #print("delete",self.kwargs["post"])
            instance = self.get_object()

            post = Post.objects.select_related().filter(id=self.kwargs["post"]).update(votes=F('votes')-1) #resta -1 voto del post

            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT) #si no ocurre error

class PostActivityRePost(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = ActivityRePostSerializer

    def perform_create(self, serializer): #se ejecuta en el POST para crear una publicacion
        serializer.save(
            user=self.request.user)

class PostActivityRePostDestroy(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = ActivityRePostSerializer

    def get_object(self): #para sobreescribir el parametro pk por el filtro implementado en get_queryset
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset)

        return obj

    def get_queryset(self): #busca el registro con el filtro personalizado

        queryset = Activity.objects.filter(post=self.kwargs["post"],status='repost',user=self.request.user)

        return queryset

    def destroy(self, request, *args, **kwargs): #elimina un voto
        try:
            #print("delete",self.kwargs["post"])
            instance = self.get_object()

            post = Post.objects.select_related().filter(id=self.kwargs["post"]).update(repost=F('repost')-1) #resta -1 voto del post

            self.perform_destroy(instance)
        except Http404:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT) #si no ocurre error

class AccountRetrieve(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = AccountSerializer

    def get_object(self): #para sobreescribir el parametro pk por el filtro implementado en get_queryset
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset)

        return obj

    def get_queryset(self): #busca el registro con el filtro personalizado
        #print("self.request.user",self.request.user.id)

        queryset = User.objects.filter(pk=self.request.user.id)

        return queryset

class UserRetrieve(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = UserSerializer

    def get_object(self): #para sobreescribir el parametro pk por el filtro implementado en get_queryset
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset)

        return obj

    def get_queryset(self): #busca el registro con el filtro personalizado
        #print("self.request.user",self.request.user.id)
        if self.kwargs is not None and 'username' in self.kwargs:
          user_id = User.objects.get(username=self.kwargs["username"])

        queryset = User.objects.filter(pk=user_id.id)

        return queryset

class UserList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = UserListSerializer

    def get_queryset(self): #consultar

        """
        print("PostUserList")
        print('username',self.kwargs["username"])
        print('list',self.kwargs["list"])
        """

        #user_id = self.request.user

        if self.kwargs is not None and 'username' in self.kwargs:
          print("filtro")

          user_id = User.objects.get(username=self.kwargs["username"])

        queryset = Post.objects.filter(author=user_id,list__isnull=False).distinct('list').order_by('list')

        return queryset

class FriendshipListCreate(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = FollowerSerializer

    def perform_create(self, serializer): #se ejecuta en el POST cuando crea un registro en bd
        if self.kwargs is not None and 'username' in self.kwargs:
          user_id = User.objects.get(username=self.kwargs["username"])

        serializer.save(
            follower=self.request.user, user=user_id)

    def list(self, request, *args, **kwargs): #se ejecuta el select personalizado

        if self.kwargs is not None and 'username' in self.kwargs:
          if self.request.user.username == self.kwargs["username"]: #valida que un usuario no se pueda seguir a si mismo
            return Response(status=status.HTTP_204_NO_CONTENT)

        serializer_data = self.get_queryset()
        serializer = self.serializer_class(serializer_data, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def get_queryset(self): #consultar

        if self.kwargs is not None and 'username' in self.kwargs:
          user_id = User.objects.get(username=self.kwargs["username"])

        queryset = Follower.objects.filter(user=user_id,follower=self.request.user)

        return queryset

class FriendshipDestroy(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = FollowerSerializer

    def get_object(self): #para sobreescribir el parametro pk por el filtro user y follower implementado en get_queryset
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset)

        return obj

    def get_queryset(self): #filtra el registro a eliminar buscando por la combinación user y follower

        if self.kwargs is not None and 'username' in self.kwargs:
          user_id = User.objects.get(username=self.kwargs["username"])

        queryset = Follower.objects.filter(user=user_id,follower=self.request.user)

        return queryset


class FollowingList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,) #restringue a que solo se pueda consumir si un usuario está logeado

    serializer_class = FollowerSerializer

    def get_queryset(self): #consultar

        if self.kwargs is not None and 'username' in self.kwargs:
          user_id = User.objects.get(username=self.kwargs["username"])

        queryset = Follower.objects.filter(follower=user_id)

        return queryset
