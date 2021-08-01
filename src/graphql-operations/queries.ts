import { gql } from "@apollo/client";

export const GET_HEROES = gql`
  query GET_HEROES {
    heroes {
      id
      firstName
      lastName
      knownAs
      house
    }
  }
`;

export const GET_VILLAINS = gql`
  query GET_VILLAINS {
    villains {
      id
      firstName
      lastName
      knownAs
      house
    }
  }
`;

export const GET_ANTI_HEROES = gql`
  query GET_ANTI_HEROES {
    antiHeroes {
      id
      firstName
      lastName
      knownAs
      house
    }
  }
`;
