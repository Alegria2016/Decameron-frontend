# Documentación del Sistema de Gestión Hotelera

Sistema para la gestión de hoteles desarrollado en VUE 3 y Laravel 12x.

La aplicacion cuenta con las siguientes funciones:

Registrar hoteles con datos básicos y tributarios

Asignar tipos de habitación con sus respectivas acomodaciones

Validar configuraciones según reglas de negocio

Gestionar el inventario de habitaciones.

Frontend Demo:
https://decameron-frontend.onrender.com/hotels

![image](https://github.com/user-attachments/assets/cc58af7c-9525-4129-a59c-52dc819a0cdc)


Framework: Vue 3 (Composition API)

UI: Vue
Estado: Pinia

HTTP: Axios

Validación: Vuelidate

## Framworks usados en el desarrollo.

Backend
Lenguaje: PHP 8.2

Framework: Laravel 12

Base de datos: PostgreSQL 15

Autenticación: Sanctum.

Infraestructura
Hosting: Render.com (Frontend + Backend)

CI/CD: GitHub Actions

## Modelos Entidad Relacion (MER)
![image](https://github.com/user-attachments/assets/51337a34-b75a-4c30-8d67-7bc4326c46b7)
## Modelo de Datos (Diagrama UML)
![DIAGRAMA ULM](https://github.com/user-attachments/assets/8cb44e4b-b68b-4d97-8bc8-85c4d2097422)





## Despliegue en Diferentes Amnbientes.

Ambientes de Desarrollo Backend Laravel (Recomentadion Tener instalado Composer para ejecucion de comandos preferiblente Laragon que ya cuenta con todas las herramientas necesarias.)

1) Clonar Repositorio: https://github.com/Alegria2016/backend-decameron-app
2) Una vez clonado el repositorio ubicarse dentro de la carpeta del proyecto y abrir ventana de comandos.
3) Ejecutar comando ```sh npm install ``` para instalar dependencias.
5) Configurar variables de Entornos en el archivo .env (Especificar Nombre de base de Postgresql, usuarios y contraseña)
6) Una vez se especifique variables de entorno ejecutar los siguientes comandos para las migraciones: ```php artisan migrate```
7) Carga de datos previos de las tablas Tipos de Habitaciones, Acomodaciones y la relacion entre las dos tablas. 
8) Una vez Ejecutada las migraciones iniciar la aplicacion con el siguiente comando php artisan serve.

Ambientes de Desarrollo Frontend VUE (Recomentadion Tener instalado Composer para ejecucion de comandos preferiblente Laragon que ya cuenta con todas las herramientas necesarias.)

1) Clonar Repositorio: https://github.com/Alegria2016/Decameron-frontend
2) Una vez clonado el repositorio ubicarse dentro de la carpeta del proyecto y abrir ventana de comandos.
3) Ejecutar comando ```sh npm install ``` para instalar dependencias.
5) Configurar variables de Entornos en el archivo .env (Especificar endPoint donde esta corriendo el backend)
6) Una vez se especifique variables de entorno ejecutar los siguientes comandos para las migraciones: ```npm run dev```
7) Una vez se ejecute el comando le muestra la url donde esta corriendo la aplicacion.
   
   ![image](https://github.com/user-attachments/assets/d25d28c7-dc35-40c0-8a00-0cac147c131f)




### Desplegar en Docker.

Ambientes de Desarrollo

1) Clonar Repositorio: https://github.com/Alegria2016/backend-decameron-app o para el repo del front.
2) Una vez clonado revise variables de entorno de conexion a Base de Datos y demas.
3) Luego abrir Docker Desktop y abrir consola de comandos PowerShell y ejecutar el siguiente comando  ```wsl ```
   El anterior comando espara que le permita ejecutar comandos curl.
5) Si se hizo correctamente, la consola cambia de apaciencia, luego ejecute el siguiente comando  ``` ./vendor/bin/sail up -d ```
6) El comando anterio le permite iniciar el contenedor luego ejecute el siguient comando para hacer migraciones ```./vendor/bin/sail artisan migrate```
7) Una vez se ejecute las migraciones puede validarlo ejecutando el siguiente comando: ```./vendor/bin/sail artisan migrate:status ```.
8) Si todo sale correctamente cargue los datos de inicio de la aplicacion ejecutando el siguiente comando: ```./vendor/bin/sail artisan migrate:fresh --seed ```.
9) En este punto revisar acceso a la aplicacion que por defecto http://127.0.0.1:8000 para ser consumida la aplicacion.
  

