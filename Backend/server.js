import dotenv from 'dotenv';
import express, { json } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import cors from 'cors';

dotenv.config();

const app = express();
const { connect, connection } = mongoose;

connect(process.env.DB_URL)
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

const db = connection;
db.on('error', (error) => console.error(error));

app.use(cors({
  origin: process.env.WEB_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(json());
app.use('/user', userRouter);

app.listen(3000, () => console.log('Server started on port 3000'));
