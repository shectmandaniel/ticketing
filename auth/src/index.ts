import mongoose from 'mongoose';

import { app } from './app';

const startUp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongodb-srv:27017/auth');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Auth listening on port 3000');
  });
};
startUp();
