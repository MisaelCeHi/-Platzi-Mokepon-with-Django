from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, JsonResponse
# from django.urls import reverse

from .models import Player


# Create your views here.
players = []


def index(request): return render(request, 'core/index.html')


def join(request):
    player = Player.objects.create()
    players.append(player)

    return HttpResponse(player.id)


def playerMokepon(request, player_id):
    player = get_object_or_404(Player, pk=player_id)
    body_unicode = request.body.decode('utf-8')
    player.mokepon_set.create(name=body_unicode)
    data = list(player.mokepon_set.all().values())
    print(data)
    return JsonResponse({'player': data})
