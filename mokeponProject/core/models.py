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


class Enemy(models.Model):
    name = models.CharField(max_length=10, default="")
    posX = models.IntegerField(default=0)
    posY = models.IntegerField(default=0)
    attack = models.CharField(max_length=25, default="")
    type = models.CharField(max_length=10, default="")
    hp = models.IntegerField(default=15)

    def __str__(self):
        return self.name
