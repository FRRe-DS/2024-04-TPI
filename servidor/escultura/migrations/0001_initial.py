# Generated by Django 5.1.2 on 2024-10-12 20:30

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
                ('estilo', models.CharField(max_length=255)),
                ('descripcion', models.TextField(null=True)),
                ('fecha_creacion', models.DateField()),
                ('escultor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='escultor.escultor')),
            ],
        ),
    ]
