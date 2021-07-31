module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    neo4j: {
      uri: process.env.NEO4j_URI,
      user: process.env.NEO4j_USER,
      password: process.env.NEO4j_PASSWORD,
    },
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
};
