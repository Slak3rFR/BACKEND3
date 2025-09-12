import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios y Mascotas',
      version: '1.0.0',
      description: 'Documentación de la API para el módulo de Usuarios',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routers/users.router.js'], // Ruta del router de usuarios
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;