export const resolvers = {
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
