import os
import psycopg2
from psycopg2 import sql
from django.conf import settings
import django

# Establecer el módulo de configuración de Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'servidor.settings')

# Inicializar Django
django.setup()

# Configuración de la base de datos desde el archivo settings
db_config = settings.DATABASES['default']
db_name = db_config['NAME']
db_user = db_config['USER']
db_password = db_config['PASSWORD']
db_host = db_config['HOST']
db_port = db_config['PORT']

def create_database():
    
    connection = psycopg2.connect(
        dbname='postgres',
        user=db_user,
        password=db_password,
        host=db_host,
        port=db_port
    )
    connection.autocommit = True  

    with connection.cursor() as cursor:
        # Verificar si la base de datos ya existe
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_name,))
        exists = cursor.fetchone()

        if not exists:
            # Crear la base de datos si no existe
            cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(db_name)))
            print(f"Base de datos '{db_name}' creada exitosamente.")
        else:
            print(f"La base de datos '{db_name}' ya existe.")

    connection.close()

if __name__ == "__main__":
    create_database()