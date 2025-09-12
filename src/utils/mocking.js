import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('coder123', 10), // Encriptar contraseña
      role: faker.random.arrayElement(['user', 'admin']), // Rol aleatorio
      pets: [], // Array vacío
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return users;
};

export const generatePets = (count) => {
  const pets = [];
  for (let i = 0; i < count; i++) {
    pets.push({
      name: faker.name.firstName(),
      species: faker.random.arrayElement(['dog', 'cat', 'bird']),
      adopted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return pets;
};