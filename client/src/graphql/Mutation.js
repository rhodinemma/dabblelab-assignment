import { gql } from "@apollo/client";

export const ADD_COUNTRY_POPULATION = gql`
  mutation addCountryPopulation(
    $country: String!
    $year: String!
    $area: Float!
    $totalPopulation: Float!
  ) {
    addCountryPopulation(
      country: $country
      year: $year
      area: $area
      totalPopulation: $totalPopulation
    ) {
      id
      country
      year
      area
      totalPopulation
    }
  }
`;

export const UPDATE_COUNTRY_POPULATION = gql`
  mutation updateCountryPopulation(
    $id: ID!
    $country: String!
    $year: String!
    $area: Float!
    $totalPopulation: Float!
  ) {
    updateCountryPopulation(
      id: $id
      country: $country
      year: $year
      area: $area
      totalPopulation: $totalPopulation
    ) {
      id
      country
      year
      area
      totalPopulation
    }
  }
`;

export const DELETE_COUNTRY_POPULATION = gql`
  mutation deleteCountryPopulation($id: ID!) {
    deleteCountryPopulation(id: $id)
  }
`;
