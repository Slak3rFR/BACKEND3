import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import usersRouter from './routes/users.router.js';
import mocksRouter from './routes/mocks.router.js';
import adoptionRouter from './routes/adoption.router.js';
import logger from './utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB usando la URI del .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => logger.info('Conectado a MongoDB Atlas'))
  .catch(err => logger.error('Error conectando a MongoDB Atlas:', err));

// Routers
app.use('/api/users', usersRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api/adoptions', adoptionRouter);

// Documentación con Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: err.message });
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => logger.info(`Servidor corriendo en puerto ${PORT}`));

export default app;