from django.contrib import admin
from .models import Evento, ParticipacionEscultor, ParticipacionEscultura

admin.site.register(Evento)
admin.site.register(ParticipacionEscultura)
admin.site.register(ParticipacionEscultor)