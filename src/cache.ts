import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";
import { AntiHeroesData } from "./models/client/antiHeroModel";
import { HeroesData } from "./models/client/heroModel";
import { VillainsData } from "./models/client/villainModel";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        heroes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        villains: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        antiHeroes: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const totalHeroesVar = cache.makeVar<number>(0);
export const totalVillainsVar = cache.makeVar<number>(0);
export const totalAntiHeroesVar = cache.makeVar<number>(0);
