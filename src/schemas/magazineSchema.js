const { gql } = require('graphql-tag'); // Use graphql-tag instead of apollo-server-express

const typeDefs = gql`
  type Magazine {
    id: ID!
    title: String!
    content: String
    createdAt: String
  }

  type Query {
    getMagazine(id: ID!): Magazine
    getMagazines: [Magazine]
  }

  type Mutation {
    addMagazine(title: String!, content: String): Magazine
    updateMagazine(id: ID!, title: String, content: String): Magazine
    deleteMagazine(id: ID!): Magazine
  }
`;

module.exports = typeDefs;
