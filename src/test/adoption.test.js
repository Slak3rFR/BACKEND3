import chai from 'chai';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';

const expect = chai.expect;
const request = supertest(app);

describe('Adoption Router', () => {
  before(async () => {
    // Conectar a una base de datos de prueba
    await mongoose.connect('mongodb://localhost:27017/test_database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Limpiar la base de datos y desconectar
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe('GET /api/adoptions', () => {
    it('debería devolver una lista de adopciones', async () => {
      const res = await request.get('/api/adoptions');
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /api/adoptions', () => {
    it('debería crear una nueva adopción', async () => {
      const newAdoption = {
        userId: '1234567890abcdef12345678', // ID válido de usuario
        petId: 'abcdef1234567890abcdef12', // ID válido de mascota
      };
      const res = await request.post('/api/adoptions').send(newAdoption);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('_id');
      expect(res.body.userId).to.equal(newAdoption.userId);
      expect(res.body.petId).to.equal(newAdoption.petId);
    });

    it('debería fallar si faltan parámetros', async () => {
      const res = await request.post('/api/adoptions').send({});
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('GET /api/adoptions/:id', () => {
    it('debería devolver una adopción por ID', async () => {
      // Primero crear una adopción
      const newAdoption = {
        userId: '1234567890abcdef12345678',
        petId: 'abcdef1234567890abcdef12',
      };
      const createRes = await request.post('/api/adoptions').send(newAdoption);
      const adoptionId = createRes.body._id;

      const res = await request.get(`/api/adoptions/${adoptionId}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id', adoptionId);
    });

    it('debería fallar si el ID no existe', async () => {
      const res = await request.get('/api/adoptions/1234567890abcdef12345678');
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('error');
    });
  });
});