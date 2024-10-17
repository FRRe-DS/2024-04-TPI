# Trabajo Practico Final 2024 - Grupo 4

## Integrantes:
1. Benetucci, Ignacio Agustin - b4ngi
2. Bravo, Juan Pablo - BJuanP
3. Fernández, Andrés Darío - Androthepunk
4. Gallego, Adriel Fernando - adrielg9
5. Ibaigorria, Ignacio Iván - IgnacioIbaigorria
6. Nikcevich, Adriano - adrinikcevich
7. Nikcevich, Iván Josué - ivannikcevich

## Objetivo del Proyecto
Analizar, desarrollar e implementar un sistema de gestión para la organización de la Bienal Internacional de Escultura del Chaco, que de soporte al registro de los eventos, escultores como así también aplicaciones satélites para que los ciudadanos/publico en general pueda realizar comentarios y votación durante el evento.

## Tecnologías Utilizadas
- **Servidor**: Django + Django REST Framework  
- **Cliente**: React
- **Base de Datos**: PostgreSQL

## Instalación y Configuración

### Servidor
1. Instalar dependendias:
    ```
    pip install -r requirements.txt
    ```

2. Aplicar migraciones:
    ```
    python manage.py makemigrations
    python manage.py migrate
    ```

3. Ejecutar el servidor:
    ```
    python manage.py runserver
    ```

    
### Cliente
1. Instalar dependendias:
    ```
    npm install
    ```

2. Ejecutar localmente
    ```
    npm run dev
    ```