# Generated by Django 4.1 on 2022-09-03 03:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_remove_enemy_attack_attack_damage_attack_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='attack',
            name='player_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.enemy'),
        ),
    ]
