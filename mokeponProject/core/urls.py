from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('join', views.JoinView.as_view(), name='join'),
    path('mokepon/<int:player_id>', views.EnemyPositionView.as_view(),
         name='enemy_position'),
    # path('mokepon/<int:player_id>/position', views.playerPosition,
    #     name='playerPosition'),
    path('mokepon/<int:player_id>/attack', views.AttackView.as_view(),
         name='attack'),
]
