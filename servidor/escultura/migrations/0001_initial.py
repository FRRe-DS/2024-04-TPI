# Generated by Django 5.1.2 on 2024-10-14 05:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('escultor', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Escultura',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=255)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('tematica', models.CharField(max_length=255)),
                ('fecha_creacion', models.DateField()),
                ('escultor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='esculturas', to='escultor.escultor')),
            ],
        ),
        migrations.CreateModel(
            name='ImagenEscultura',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('imagen', models.ImageField(upload_to='esculturas/')),
                ('etapa', models.CharField(choices=[('antes', 'Antes del evento'), ('durante', 'Durante el evento'), ('despues', 'Después del evento')], max_length=10)),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('fecha_subida', models.DateTimeField(auto_now_add=True)),
                ('escultura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='imagenes', to='escultura.escultura')),
            ],
        ),
    ]