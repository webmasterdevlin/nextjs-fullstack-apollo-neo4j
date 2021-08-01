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
          // read() {
          //   return antiHeroesVar();
          // },
        },
      },
    },
  },
});

export const antiHeroesVar: ReactiveVar<AntiHeroesData> =
  makeVar<AntiHeroesData>({
    antiHeroes: [],
  });

export const heroesVar: ReactiveVar<HeroesData> = makeVar<HeroesData>({
  heroes: [],
});

export const villainsVar: ReactiveVar<VillainsData> = makeVar<VillainsData>({
  villains: [],
});
