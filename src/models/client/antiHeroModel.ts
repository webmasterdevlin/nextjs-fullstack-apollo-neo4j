export interface AntiHero {
  id: string;
  firstName: string;
  lastName: string;
  knownAs: string;
  house: string;
}

export interface AntiHeroesData {
  antiHeroes: AntiHero[];
}
