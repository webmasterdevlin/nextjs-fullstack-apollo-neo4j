import { ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import getConfig from "next/config";
import "ts-tiny-invariant";

import { resolvers } from "src/resolvers";
import { typeDefs } from "src/schemas";

const { uri, user, password } = getConfig().serverRuntimeConfig.neo4j;

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
});

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
