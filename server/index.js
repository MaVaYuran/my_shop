import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './router/index.js';

const app = express();
app.use(
  cors({
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router);

const start = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(process.env.PORT);
    app.listen(process.env.PORT, () => console.log('server started'));
  } catch (e) {
    console.log(e);
  }
};

start();
