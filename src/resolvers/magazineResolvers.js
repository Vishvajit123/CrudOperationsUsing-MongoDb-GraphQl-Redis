const Magazine = require('../models/Magazine');
const { redisClient } = require('../config/db');

const resolvers = {
  Query: {
    getMagazine: async (_, { id }) => {
      const cacheData = await redisClient.get(`magazine:${id}`);
      if (cacheData) return JSON.parse(cacheData);

      const magazine = await Magazine.findById(id);
      if (magazine) {
        await redisClient.set(`magazine:${id}`, JSON.stringify(magazine));
      }
      return magazine;
    },
    getMagazines: async () => {
      return await Magazine.find();
    },
  },

  Mutation: {
    addMagazine: async (_, { title, content }) => {
      const magazine = new Magazine({ title, content });
      await magazine.save();
      // Optionally cache the new magazine if needed
      await redisClient.set(`magazine:${magazine.id}`, JSON.stringify(magazine));
      return magazine;
    },
    updateMagazine: async (_, { id, title, content }) => {
      const magazine = await Magazine.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      );
      await redisClient.del(`magazine:${id}`); //removig old cache entry
      // Optionally cache the updated magazine if needed
      await redisClient.set(`magazine:${id}`, JSON.stringify(magazine));
      return magazine;
    },
    deleteMagazine: async (_, { id }) => {
      const magazine = await Magazine.findByIdAndRemove(id);
      await redisClient.del(`magazine:${id}`); // Remove from cache
      return magazine;
    },
  },
};

module.exports = resolvers;
