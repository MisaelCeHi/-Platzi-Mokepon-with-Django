# Generated by Django 4.1 on 2022-09-01 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_enemy_delete_mokepon_delete_player'),
    ]

    operations = [
        migrations.CreateModel(
            name='attack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
