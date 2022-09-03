import json
from time import sleep

from django.http import JsonResponse, StreamingHttpResponse
# from django.urls import reverse
from django.views import View
from django.views.generic.base import TemplateView
from django.core.serializers.json import DjangoJSONEncoder
from .models import Enemy, Attack

# Code here
players = []
attacks = {}


def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'


class IndexView(TemplateView):
    Attack.objects.all().delete()
    template_name = 'core/index.html'


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


class EnemyPositionView(View):
    def post(self, request, player_id):
        coords = json.loads(request.body)
        for player in players:
            if player_id == player.id:
                player.posX, player.posY = coords['posX'], coords['posY']
        enemys = [enemy.to_dict() for enemy in players
                  if enemy.id != player_id]
        return JsonResponse({"enemys": enemys})


def event_stream():
    initial_data = ''
    while True:
        try:
            data = Attack.objects.last().to_dict()
        except AttributeError:
            data = ''
        else:
            data = json.dumps(Attack.objects.last().to_dict(),
                              cls=DjangoJSONEncoder)
        if not initial_data == data:
            yield "\ndata: {}\n\n".format(data)
            initial_data = data
        sleep(1)


class AttackView(View):
    def get(self, request, *args, **kwargs):
        response = StreamingHttpResponse(event_stream())
        response['Content-Type'] = 'text/event-stream'
        return response

    def post(self, request, player_id):
        data = json.loads(request.body.decode('utf-8'))
        e = Enemy.objects.get(pk=player_id)
        if e.attack_set.all().count() > 0:
            e.attack_set.all().delete()
            new_attack = e.attack_set.create(
                name=data['Name'],
                damage=data['Damage'])
        else:
            new_attack = e.attack_set.create(
                name=data['Name'],
                damage=data['Damage'])
        return JsonResponse(new_attack.to_dict())
