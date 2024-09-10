const mongoose = require('mongoose');
const redis = require('redis');

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/graphQl';
mongoose.connect(mongoURI);   //it represent the active conn to db

const db = mongoose.connection ;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Redis Connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect().then(() => {
  console.log('Connected to Redis');
});

module.exports = { db, redisClient };
