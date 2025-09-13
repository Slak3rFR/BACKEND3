Entrega final – Comisión 74590 – Backend III: Testing y Escalabilidad Backend. Alumno: Franco Reynoso

API para gestionar usuarios, mascotas y adopciones.

## Instalación

Instrucciones de instalación del proyecto:
Clonar el repositorio:
git clone https://github.com/Slak3rFR/BACKEND3.

Instalar las dependencias:
npm install

Configurar un archivo .env con las siguientes variables de entorno:
PORT=
MONGO_URL=
DB_NAME=

Iniciar proyecto:
npm start

Tener en cuenta que para correr correctamente el proyecto se necesita tener instalado Node con la versión 22 o superior a la misma.

Para saber la versión de node instalada deberías correr el siguiente comando:

node --version

Corrida de test unitarios del proyecto:
Para correr los test unitarios se deberá ejecutar el siguiente comando:

npm test
Esto deberá ser suficiente para correr los test unitarios elaborados y configurados en la carpeta test del proyecto.

Docker
Construir la imagen

docker build -t slak3rfr/backend3 .

Ejecutar el contenedor

docker run -p 8080:8080 --env MONGO_URI=mongodb://host.docker.internal:27017/your_database slak3rfr/backend3

Imagen en DockerHubLa imagen está disponible en: https://hub.docker.com/repository/docker/slak3rfr/backend3

Endpoints
Users: /api/users
Mocks: /api/mocks
Adoptions: /api/adoptions


