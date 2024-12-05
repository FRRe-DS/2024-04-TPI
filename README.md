# Trabajo Práctico Final 2024 - Grupo 4

## Integrantes:
1. Benetucci, Ignacio Agustin - b4ngi
2. Bravo, Juan Pablo - BJuanP
3. Fernández, Andrés Darío - Androthepunk
4. Gallego, Adriel Fernando - adrielg9
5. Ibaigorria, Ignacio Iván - IgnacioIbaigorria
6. Nikcevich, Adriano - adrinikcevich
7. Nikcevich, Iván Josué - ivannikcevich

## Objetivo del proyecto
Analizar, desarrollar e implementar un sistema de gestión para la organización de la Bienal Internacional de Escultura del Chaco, que de soporte al registro de los eventos, escultores como así también aplicaciones satélites para que los ciudadanos/publico en general pueda realizar comentarios y votación durante el evento.

## Tecnologías ttilizadas
- **Servidor**: Django + Django REST Framework  
- **Cliente**: React
- **Base de Datos**: PostgreSQL

## Instalación y configuración

### Servidor y base de Datos (asegurarse de estar en la ruta "servidor")
1. Instalar dependencias:
    ```
    pip install -r requirements.txt
    ```

2. Ejecutar el script para la creación de la base de datos
    ```
    python create_db.py
    ```

3. Aplicar migraciones:
    ```
    python manage.py makemigrations
    ```
     ```
    python manage.py migrate
    ```

4. Cargar datos de prueba a la base de datos:
    ```
    python datos_prueba.py
    ```

3. Ejecutar el servidor:
    ```
    python manage.py runserver
    ```

### Cliente (asegurarse de estar en la ruta "cliente")
1. Instalar dependencias:
    ```
    npm install
    ```

2. Ejecutar localmente
    ```
    npm run dev
    ```

#### Usuarios para iniciar sesión
Visitantes:
Correo electrónico: visitante1@gmail.com (mismo correo para demás usuarios, de 1 hasta 10)
Contraseña: password123 (misma contraseña para todos los correos)

Admin:
Correo electrónico: admin@gmail.com
Contraseña: password123
