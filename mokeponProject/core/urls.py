from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path('', views.index, name='index'),
    path('join/', views.join, name='join'),
    path('mokepon/<int:player_id>', views.playerMokepon,
         name='playerMokepon')
]
