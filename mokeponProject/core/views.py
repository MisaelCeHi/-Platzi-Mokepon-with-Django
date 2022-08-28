from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
# from django.urls import reverse
from .models import Player


# Create your views here.
players = []


def index(request):
    print(players)
    return render(request, 'core/index.html')


def join(request):
    player = Player.objects.create()
    players.append(player)
    print(player.id, request)
    return HttpResponse(player.id)


def playerMokepon(request, player_id):
    player = Player.objects.filter(,)
    data = list(Player.objects.all().values())
    print(players)
    print('*******************')
    return JsonResponse({"Players": data})
