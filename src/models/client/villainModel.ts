export interface Villain {
  id: string;
  firstName: string;
  lastName: string;
  knownAs: string;
  house: string;
}

export interface VillainsData {
  villains: Villain[];
}
