from django.urls import path
from . import views

urlpatterns = [
  #post
  path('api/posts/submit', views.Submit.as_view() ),
  #path('api/posts/', views.PostListCreate.as_view() ), #listar todos los posts o crear uno nuevo
  path('api/posts/', views.PostList.as_view() ), #listar todos los posts o crear uno nuevo
  path('api/posts/update', views.PostCreate.as_view() ), #listar todos los posts o crear uno nuevo
  path('api/posts/recent', views.RecentPostsList.as_view() ), #listar todos los posts o crear uno nuevo
  #path('api/posts/<str:username>', views.PostListCreate.as_view() ), #listar todos los posts por usuario
  path('api/posts/<str:username>', views.PostList.as_view() ), #listar todos los posts del usuario
  path('api/posts/<str:username>/emojis/<str:emoji>', views.PostUserEmoji.as_view() ), #listar todos los posts del usuario para este emoji
  path('api/posts/<str:username>/lists/<str:list>', views.PostUserList.as_view() ), #listar todos los posts de una lista del usuario
  

  #path('api/community/posts/<str:community>', views.PostCommunityList.as_view() ), #listar todos los posts de una comunidad

  path('api/activities/<str:post>/view', views.PostActivityView.as_view() ),
  path('api/activities/<str:post>/vote', views.PostActivityVote.as_view() ),
  path('api/activities/<str:post>/vote/destroy', views.PostActivityVoteDestroy.as_view() ),
  path('api/activities/<str:post>/repost', views.PostActivityRePost.as_view() ),
  path('api/activities/<str:post>/repost/destroy', views.PostActivityRePostDestroy.as_view() ),

  #user api
  path('api/friendships/<str:username>', views.FriendshipListCreate.as_view() ), #lista y crea una relacion como seguidor del usuario logeado con :username
  path('api/friendships/<str:username>/destroy', views.FriendshipDestroy.as_view() ), #elimina una relacion como seguidor del usuario logeado con :username

  #convertir url como api/users/<str:username>/following
  #path('api/following/<str:username>', views.FollowingList.as_view() ), #lista los usuarios que sigue :username
  #path('api/followers/<str:username>', views.FollowerListCreate.as_view() ), #lista los seguidores de :username

  #user api
  path('api/users/me', views.CurrentUserRetrieve.as_view() ), #listar info de un usuario
  path('api/users/top', views.TopUsersList.as_view() ), #listar info de un usuario
  path('api/users/<str:username>', views.UserRetrieve.as_view() ), #listar info de un usuario
  path('api/users/<str:username>/lists', views.UserList.as_view() ), #listar todas listas del usuario
  #path('api/users/<str:username>/communities', views.UserCommunities.as_view() ), #listar todos las comunidades en las que el usuario es miembro

  #account api
  #path('api/account/settings', views.AccountRetrieve.as_view() ), #listar todos los posts o crear uno nuevo

]
