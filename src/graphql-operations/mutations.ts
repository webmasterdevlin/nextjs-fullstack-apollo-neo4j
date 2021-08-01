import { gql } from "@apollo/client";

export const CREATE_HERO = gql`
  mutation CREATE_HERO(
    $firstName: String!
    $lastName: String!
    $knownAs: String!
    $house: String!
  ) {
    createHero(
      firstName: $firstName
      lastName: $lastName
      knownAs: $knownAs
      house: $house
    ) {
      id
      firstName
      lastName
      knownAs
      house
    }
  }
`;

export const CREATE_ANTI_HERO = gql`
  mutation CREATE_ANTI_HERO(
    $firstName: String!
    $lastName: String!
    $knownAs: String!
    $house: String!
  ) {
    createAntiHero(
      firstName: $firstName
      lastName: $lastName
      knownAs: $knownAs
      house: $house
    ) {
      id
      firstName
      lastName
      knownAs
      house
    }
  }
`;

export const CREATE_VILLAIN = gql`
  mutation CREATE_VILLAIN(
    $firstName: String!
    $lastName: String!
    $knownAs: String!
    $house: String!
  ) {
    createVillain(
      firstName: $firstName
      lastName: $lastName
      knownAs: $knownAs
      house: $house
    ) {
      id
      firstName
      lastName
      knownAs
      house
    }
  }
`;

export const DELETE_HERO_BY_ID = gql`
  mutation DELETE_HERO_BY_ID($id: ID!) {
    deleteHeroById(id: $id) {
      id
    }
  }
`;

export const DELETE_VILLAIN_BY_ID = gql`
  mutation DELETE_VILLAIN_BY_ID($id: ID!) {
    deleteVillainById(id: $id) {
      id
    }
  }
`;

export const DELETE_ANTI_HERO_BY_ID = gql`
  mutation DELETE_ANTI_HERO_BY_ID($id: ID!) {
    deleteAntiHeroById(id: $id) {
      id
    }
  }
`;
