//    /src/app.js

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from "./config/index.js";
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

/*NUEVA IMPORTACIÓN:*/
import mocksRouter from './routes/mocks.router.js';

const app = express();
const { PORT, MONGO_URI, DB_NAME } = config; //Lo sacamos de acá y lo llevamos a un archivo '/config/index.js', que trae el .env


app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.use('/api/mocks', mocksRouter);


app.listen(PORT, () => console.log(`listening on port ${PORT}`))

mongoose.connect(MONGO_URI, { dbName: DB_NAME })
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => {
    console.error({ error: err.message })
    process.exit(1)
})