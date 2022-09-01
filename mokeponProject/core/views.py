import json

from django.http import HttpResponse, JsonResponse
# from django.urls import reverse
from django.views import View
from django.views.generic.base import TemplateView

from .models import Enemy


# Create your views here.
players = []


class IndexView(TemplateView):
    template_name = 'core/index.html'
# def index(request): return render(request, 'core/index.html')


class JoinView(View):
    def post(self, request, *args, **kwargs):
        player = request.body.decode('utf-8')
        player = json.loads(player)
        new_player = Enemy.objects.create(
            name=player['name'],
            type=player['type'],
            hp=player['hp'],
            posX=player['x'],
            posY=player['y']
        )
        players.append(new_player)
        print(players)
        print('esta') if new_player in players else print('no esta')
        return JsonResponse(new_player.to_dict())

# def playerMokepon(request, player_id):
#     player = get_object_or_404(Player, pk=player_id)
#     body_unicode = request.body.decode('utf-8')
#     player.mokepon_set.create(name=body_unicode)
#     data = list(player.mokepon_set.all().values())
#
#     return JsonResponse({'player': data})


class EnemyPositionView(View):
    def get(self, request, *args, **kwargs):
        print('-------------------', request)
        return HttpResponse('get')

    def post(self, request, player_id):
        coords = json.loads(request.body)
        for player in players:
            if player_id == player.id:
                player.posX, player.posY = coords['posX'], coords['posY']
        print(players, request.body)
        enemys = [nemy.to_dict() for nemy in players if nemy.id != player_id]
        return HttpResponse(enemys)
# def playerPosition(request, player_id):
#     player = get_object_or_404(Player, pk=player_id)
#     body_unicode = request.body.decode('utf-8')
#     coords = [int(i) for i in body_unicode.split(',')]
#     player.posX = coords[0]
#     player.posY = coords[1]
#     if player in players:
#         players.remove(player)
#         players.append(player)
#     else:
#         players.append(player)
#     print(request.body, coords, player.posX, player.posY, player.id, player,
#     #      players)
#     enemys = []
#     for p in players:
#         if p.id != player_id and p != [] and len(p.mokepon_set.all()) > 0:
#             p_list = list(p.mokepon_set.all().values())
#             p_list[0]['x'] = p.posX
#             p_list[0]['y'] = p.posY
#             # print(p.posX, p.posY, p.id, p, player_id)
#             enemys.append(p_list[0])
#     # print('ENEMYS', enemys)
#     return JsonResponse({'enemys': enemys})
#
#
# def sendAttack(request, player_id):
#     player = get_object_or_404(Player, pk=player_id)
#     attacks = request.body.decode('utf-8')
#     print(attacks, player.id)
#     return HttpResponse(request.body)
