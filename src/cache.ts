import { InMemoryCache, makeVar } from "@apollo/client";

export const cache: InMemoryCache = new InMemoryCache();

export const heroesVar = makeVar<any>([]);

export const villainsVar = makeVar<any>({
  villains: [],
});

export const antiHeroesVar = makeVar<any>({
  antiHeroes: [],
});
