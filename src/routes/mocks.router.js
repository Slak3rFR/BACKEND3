import { Router } from 'express';
import { generateUsers, generatePets } from '../utils/mocking.js';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';
import logger from '../utils/logger.js'; // Importar logger

const router = Router();

router.get('/mockingpets', async (req, res, next) => {
  try {
    logger.info('Generando datos de mocking para mascotas');
    const pets = generatePets(50);
    res.status(200).json(pets);
  } catch (error) {
    logger.error(`Error en /mockingpets: ${error.message}`);
    next(error);
  }
});

router.get('/mockingusers', async (req, res, next) => {
  try {
    logger.info('Generando datos de mocking para usuarios');
    const users = generateUsers(50);
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Error en /mockingusers: ${error.message}`);
    next(error);
  }
});

router.post('/generateData', async (req, res, next) => {
  try {
    const { users, pets } = req.body;
    logger.info(`Generando ${users} usuarios y ${pets} mascotas`);

    if (!users || !pets || isNaN(users) || isNaN(pets)) {
      throw new Error('Parámetros "users" y "pets" deben ser numéricos');
    }

    const generatedUsers = generateUsers(users);
    const generatedPets = generatePets(pets);

    const insertedUsers = await User.insertMany(generatedUsers);
    const insertedPets = await Pet.insertMany(generatedPets);

    logger.info(`Insertados ${insertedUsers.length} usuarios y ${insertedPets.length} mascotas`);
    res.status(201).json({
      message: 'Datos generados e insertados correctamente',
      users: insertedUsers,
      pets: insertedPets,
    });
  } catch (error) {
    logger.error(`Error en /generateData: ${error.message}`);
    next(error);
  }
});

export default router;