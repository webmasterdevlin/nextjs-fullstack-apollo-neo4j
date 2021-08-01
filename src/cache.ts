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
          // read() {
          //   return heroesVar();
          // },
        },
        villains: {
          merge(existing, incoming) {
            return incoming;
          },
          // read() {
          //   return villainsVar();
          // },
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
