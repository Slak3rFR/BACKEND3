import { Router } from 'express';
import User from '../dao/models/User.js';
import logger from '../utils/logger.js';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id: { type: string }
 *                   firstName: { type: string }
 *                   lastName: { type: string }
 *                   email: { type: string }
 *                   role: { type: string, enum: ['user', 'admin'] }
 *                   pets: { type: array, items: { type: string } }
 *       500:
 *         description: Error del servidor
 */
router.get('/', async (req, res, next) => {
  try {
    logger.info('Obteniendo lista de usuarios');
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Error en GET /api/users: ${error.message}`);
    next(error);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalles del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: { type: string }
 *                 firstName: { type: string }
 *                 lastName: { type: string }
 *                 email: { type: string }
 *                 role: { type: string, enum: ['user', 'admin'] }
 *                 pets: { type: array, items: { type: string } }
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', async (req, res, next) => {
  try {
    logger.info(`Obteniendo usuario con ID: ${req.params.id}`);
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Error en GET /api/users/:id: ${error.message}`);
    next(error);
  }
});

// Agrega más endpoints según sea necesario

export default router;