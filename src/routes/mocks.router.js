//    /src/routes/mocks.router.js

import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { usersService, petsService } from '../services/index.js';

const router = Router();


router.get('/mockingpets', (req, res) => {
    const pets = generateMockPets(50); // por poner un número, 50 mascotas
    res.send({ status: 'success', payload: pets });
});

// Endpoint para generar usuarios ficticios
router.get('/mockingusers', async (req, res) => {
    const users = await generateMockUsers(50);
    res.send({ status: 'success', payload: users });
});

// Endpoint para generar e insertar datos en la DB
router.post('/generateData', async (req, res) => {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    await usersService.create(mockUsers);
    await petsService.create(mockPets);

    res.send({ status: 'success', message: `${users} usuarios y ${pets} mascotas generadas e insertadas.` });
});

export default router;
