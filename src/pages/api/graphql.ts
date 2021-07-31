import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import neo4j, { error } from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import getConfig from "next/config";
import "ts-tiny-invariant";

const typeDefs = gql`
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

const resolvers = {
  Mutation: {
    createHero: (obj, args, context, info) => {
      const session = context.driver.session();

      return session
        .run(
          `
        CREATE (h:Hero) SET h += $args, h.id = randomUUID()
        RETURN h
      `,
          { args }
        )
        .then((res) => {
          session.close();
          return res.records[0].get("h").properties;
        })
        .catch((error) => {
          console.log(error);
          return {
            message: error.message,
          };
        });
    },
    createAntiHero: (obj, args, context, info) => {
      const session = context.driver.session();

      return session
        .run(
          `
        CREATE (ah:AntiHero) SET ah += $args, ah.id = randomUUID()
        RETURN ah
      `,
          { args }
        )
        .then((res) => {
          session.close();
          return res.records[0].get("ah").properties;
        })
        .catch((error) => {
          console.log(error);
          return {
            message: error.message,
          };
        });
    },
    createVillain: (obj, args, context, info) => {
      const session = context.driver.session();

      return session
        .run(
          `
        CREATE (v:Villain) SET v += $args, v.id = randomUUID()
        RETURN v
      `,
          { args }
        )
        .then((res) => {
          session.close();
          return res.records[0].get("v").properties;
        })
        .catch((error) => {
          console.log(error);
          return {
            message: error.message,
          };
        });
    },
    deleteHeroById: (obj, args, context, info) => {
      const session = context.driver.session();

      return session
        .run(
          `
        MATCH (n {id: $args.id})
        DETACH DELETE n
      `,
          { args }
        )
        .then(() => {
          session.close();
          return null;
        })
        .catch((error) => {
          console.log(error);
          return {
            message: error.message,
          };
        });
    },
    deleteAntiHeroById: (obj, args, context, info) => {
      const session = context.driver.session();

      return session
        .run(
          `
        MATCH (n {id: $args.id})
        DETACH DELETE n
      `,
          { args }
        )
        .then(() => {
          session.close();
          return null;
        })
        .catch((error) => {
          console.log(error);
          return {
            message: error.message,
          };
        });
    },
    deleteVillainById: (obj, args, context, info) => {
      const session = context.driver.session();

      return session
        .run(
          `
        MATCH (n {id: $args.id})
        DETACH DELETE n
      `,
          { args }
        )
        .then(() => {
          session.close();
          return null;
        })
        .catch((error) => {
          console.log(error);
          return {
            message: error.message,
          };
        });
    },
  },
};

const { uri, user, password } = getConfig().serverRuntimeConfig.neo4j;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const neoSchema = new Neo4jGraphQL({ typeDefs, resolvers, driver });

const apolloServer = new ApolloServer({
  schema: neoSchema.schema,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
