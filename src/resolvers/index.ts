export const resolvers = {
  Mutation: {
    createHero: async (obj, args, context, info) => {
      const session = context.driver.session();
      const cypher = `
        CREATE (h:Hero) SET h += $args, h.id = randomUUID()
        RETURN h
      `;
      try {
        const { records } = await session.run(cypher, { args });
        session.close();

        return records[0].get("h").properties;
      } catch (error) {
        console.log(error);
        return {
          message: error.message,
        };
      }
    },
    createAntiHero: async (obj, args, context, info) => {
      const session = context.driver.session();
      const cypher = `
        CREATE (ah:AntiHero) SET ah += $args, ah.id = randomUUID()
        RETURN ah
      `;
      try {
        const { records } = await session.run(cypher, { args });
        session.close();

        return records[0].get("ah").properties;
      } catch (error) {
        console.log(error);
        return {
          message: error.message,
        };
      }
    },
    createVillain: async (obj, args, context, info) => {
      const session = context.driver.session();
      const cypher = `
        CREATE (v:Villain) SET v += $args, v.id = randomUUID()
        RETURN v
      `;
      try {
        const { records } = await session.run(cypher, { args });
        session.close();

        return records[0].get("v").properties;
      } catch (error) {
        console.log(error);
        return {
          message: error.message,
        };
      }
    },
    deleteHeroById: async (obj, args, context, info) => {
      const session = context.driver.session();
      const cypher = `
        MATCH (n {id: $args.id})
        DETACH DELETE n
      `;
      try {
        await session.run(cypher, { args });
        session.close();

        return null;
      } catch (error) {
        console.log(error);
        return {
          message: error.message,
        };
      }
    },
    deleteAntiHeroById: async (obj, args, context, info) => {
      const session = context.driver.session();
      const cypher = `
        MATCH (n {id: $args.id})
        DETACH DELETE n
      `;
      try {
        await session.run(cypher, { args });
        session.close();

        return null;
      } catch (error) {
        console.log(error);
        return {
          message: error.message,
        };
      }
    },
    deleteVillainById: async (obj, args, context, info) => {
      const session = context.driver.session();
      const cypher = `
        MATCH (n {id: $args.id})
        DETACH DELETE n
      `;
      try {
        await session.run(cypher, { args });
        session.close();

        return null;
      } catch (error) {
        console.log(error);
        return {
          message: error.message,
        };
      }
    },
  },
};
