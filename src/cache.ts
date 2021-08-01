import { InMemoryCache, makeVar, ReactiveVar } from "@apollo/client";
import { AntiHeroesData } from "./models/client/antiHeroModel";
import { HeroesData } from "./models/client/heroModel";
import { VillainsData } from "./models/client/villainModel";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        heroes: {
          // read(existing, incoming) {
          //   return heroesVar();
          // },
          merge(existing, incoming) {
            return incoming;
          },
        },
        villains: {
          // read(existing) {
          //   return villainsVar();
          // },
          merge(existing, incoming) {
            return incoming;
          },
        },
        antiHeroes: {
          // read(existing) {
          //   return antiHeroesVar();
          // },
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const heroesVar: ReactiveVar<HeroesData> = makeVar<HeroesData>({
  heroes: [],
});

export const villainsVar: ReactiveVar<VillainsData> = makeVar<VillainsData>({
  villains: [],
});

export const antiHeroesVar: ReactiveVar<AntiHeroesData> =
  makeVar<AntiHeroesData>({
    antiHeroes: [],
  });
