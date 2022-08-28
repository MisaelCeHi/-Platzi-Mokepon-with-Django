from django.urls import path
from . import views


urlpatterns = [
    path('', views.index, name='index'),
    path('join/', views.join, name='join'),
    path('mokepon/<int:player_id>', views.playerMokepon,
         name='player_mokepon')
]
