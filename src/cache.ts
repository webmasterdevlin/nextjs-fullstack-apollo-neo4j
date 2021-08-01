import { InMemoryCache, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        heroes() {
          return heroesVar;
        },
      },
    },
  },
});

export const heroesVar = makeVar<any>({
  heroes: [],
});
