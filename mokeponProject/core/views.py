import json

from django.http import HttpResponse, JsonResponse
# from django.urls import reverse
from django.views import View
from django.views.generic.base import TemplateView

from .models import Enemy, Attack


# Create your views here.
players = []
attacks = {}


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


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

        return JsonResponse(new_player.to_dict())

# def playerMokepon(request, player_id):
#     player = get_object_or_404(Player, pk=player_id)
#     body_unicode = request.body.decode('utf-8')
#     player.mokepon_set.create(name=body_unicode)
# data = list(player.mokepon_set.all().values())
#     return JsonResponse({'player': data})


class EnemyPositionView(View):
    def post(self, request, player_id):
        coords = json.loads(request.body)
        for player in players:
            if player_id == player.id:
                player.posX, player.posY = coords['posX'], coords['posY']
        enemys = [enemy.to_dict() for enemy in players
                  if enemy.id != player_id]
        return JsonResponse({"enemys": enemys})


class AttackView(View):
    def get(self, request, *args, **kwargs):
        print(request)
        return HttpResponse('get')

    def post(self, request, player_id):
        attack = json.loads(request.body.decode('utf-8'))
        # new_attack = Attack()
        print(attack['id'])
        # try:
        #     find_attack = Attack.objects.get(pk=attack['id'])
        # except Attack.DoesNotExist:
        #    new_attack.save()
        #    attack['id'] = new_attack.id
        #    print('new', new_attack)
        #     pass
        # else:
        #    attack['id'] = find_attack.id
        #    print('finded', find_attack)

        # data = json.loads(request.body.decode('utf-8'))
        attacks[player_id] = attack
        print(attacks, attack['id'])
        # enemy_attack = {k: v for k, v in attacks.items() if k != player_id}
        return JsonResponse(attacks)
# def sendAttack(request, player_id):
#     player = get_object_or_404(Player, pk=player_id)
#     attacks = request.body.decode('utf-8')
#     print(attacks, player.id)
#     return HttpResponse(request.body)
