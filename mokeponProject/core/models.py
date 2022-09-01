from itertools import chain

from django.db import models


# Create your models here.
# class Player(models.Model):
#    # mokepon = models.CharField(max_length=10, default='')
#    posX = models.IntegerField(default=0)
#    posY = models.IntegerField(default=0)
#    pass
#
#    def __str__(self):
#        return f'self {self.id}'
#
#
# class Mokepon(models.Model):
#    name = models.CharField(max_length=10, default='')
#    owner = models.ForeignKey(Player, on_delete=models.CASCADE)
#
#    def __str__(self):
#        return self.name
class PrintableModel(models.Model):
    def __repr__(self):
        return str(self.to_dict())

    def to_dict(instance):
        opts = instance._meta
        data = {}
        for f in chain(opts.concrete_fields, opts.private_fields):
            data[f.name] = f.value_from_object(instance)
        for f in opts.many_to_many:
            data[f.name] = [i.id for i in f.value_from_object(instance)]
        return data

    class Meta:
        abstract = True


class Enemy(PrintableModel):
    name = models.CharField(max_length=10, default="")
    posX = models.IntegerField(default=0)
    posY = models.IntegerField(default=0)
    attack = models.CharField(max_length=25, default="")
    type = models.CharField(max_length=10, default="")
    hp = models.IntegerField(default=15)
