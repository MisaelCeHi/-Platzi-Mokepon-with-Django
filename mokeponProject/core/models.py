from django.db import models


# Create your models here.
class Player(models.Model):
    # mokepon = models.CharField(max_length=10, default='')
    pass

    def __str__(self):
        return f'self {self.id}'


class Mokepon(models.Model):
    name = models.CharField(max_length=10, default='')
    owner = models.ForeignKey(Player, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
