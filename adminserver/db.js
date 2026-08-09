const mongoose = require('mongoose');
const loadEnv = require('../loadEnv');

loadEnv();

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI ||
      (process.env.NODE_ENV !== 'production' ? 'mongodb://localhost:27017/Animaldb' : undefined);

    if (!mongoUri) {
      throw new Error('MONGODB_URI must be configured in production.');
    }

    try {
      const conn = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    } catch (error) {
      console.error(`MongoDB connection failed: ${error.message}`);
      process.exit(1);
    }
  }
module.exports= connectDB;
