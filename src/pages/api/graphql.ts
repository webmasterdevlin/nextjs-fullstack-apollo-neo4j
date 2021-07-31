import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import neo4j from "neo4j-driver";
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
      firstName: String!
      lastName: String!
      knownAs: String!
      house: String!
    ): Hero!
  }
`;

const resolvers = {
  Mutation: {
    createHero: (obj, args, context, info) => {
      const session = context.driver.session();

      return {
        id: "49tgfailugfayhgygr32",
        firstName: "Devlin",
        lastName: "D.",
        knownAs: "Dev",
        house: "none",
      };

      return session
        .run(
          `
        CREATE (h:Hero) SET u += $args, h.id = randomUUID()
        RETURN h
      `,
          { args }
        )
        .then((res) => {
          session.close();
          return res.records[0].get("h").properties;
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
