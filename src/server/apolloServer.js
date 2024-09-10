const { ApolloServer } = require('@apollo/server');
const typeDefs = require('../schemas/magazineSchema');
const resolvers = require('../resolvers/magazineResolvers');

const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
};

module.exports = createApolloServer;