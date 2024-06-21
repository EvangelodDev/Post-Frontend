# README

Frontend para la creación, obtención, edición y borrado de Posts. Se utiliza React junto con NGINX para tener una paltaforma robusta y eficiente. Se utiliza redux para la mantención de estados locales. Se puede crear, eliminar y filtrar elementos de la lista. Se utiliza Formik para el formulario de Posts nuevos.

Consideraciones: Mediante validaciones de Formik, no se permiten nombres vacios ni contenidos vacíos. Por ultimo, se optimiza para no ser necesario un .env en la ruta principal, por defecto utiliza el localhost:3000 de API (https://github.com/EvangelodDev/Post-API/tree/develop)

Para ejecutar:
* Ir a la ruta principal del proyecto (donde se encuentra nginx.dockerfile y node.dockerfile).
* Ejecutar "docker-compose up --build".
* Esperar a que aparezca el mensaje "Watch build succeeded", en la etapa [4/4].
* Considerar que la primera query toma un poco más de tiempo al iniciar desde 0 el servidor.
* El puerto abierto para este servicio es el 8080. Se optimiza la estructura para no necesitar un .env, pero en el futuro, por seguridad, lo correcto es usar uno.
