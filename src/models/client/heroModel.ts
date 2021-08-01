export interface Hero {
  id: string;
  firstName: string;
  lastName: string;
  knownAs: string;
  house: string;
}

export interface HeroesData {
  heroes: Hero[];
}
