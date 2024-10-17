import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'servidor.settings')
django.setup()