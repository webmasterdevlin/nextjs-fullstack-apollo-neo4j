import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Hero @exclude(operations: [CREATE, UPDATE, DELETE]) {
    id: ID
    firstName: String
    lastName: String
    knownAs: String
    house: String
  }

  type Villain @exclude(operations: [CREATE, UPDATE, DELETE]) {
    id: ID
    firstName: String
    lastName: String
    knownAs: String
    house: String
  }

  type AntiHero @exclude(operations: [CREATE, UPDATE, DELETE]) {
    id: ID
    firstName: String
    lastName: String
    knownAs: String
    house: String
  }

  type Mutation {
    createHero(
      firstName: String
      lastName: String
      knownAs: String!
      house: String!
    ): Hero!

    createAntiHero(
      firstName: String
      lastName: String
      knownAs: String!
      house: String!
    ): AntiHero!

    createVillain(
      firstName: String
      lastName: String
      knownAs: String!
      house: String!
    ): Villain!

    deleteHeroById(id: ID!): Hero

    deleteAntiHeroById(id: ID!): AntiHero

    deleteVillainById(id: ID!): Villain
  }
`;
