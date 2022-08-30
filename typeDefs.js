import { gql } from "apollo-server-express";

const typeDefs = gql`
  type CountryPopulation {
    id: ID
    country: String
    year: String
    area: Float
    totalPopulation: Float
  }

  type Query {
    getCountriesDetails: [CountryPopulation]
    getCountryDetail(id: ID): CountryPopulation
  }

  type Mutation {
    addCountryPopulation(
      country: String!
      year: String!
      area: Float!
      totalPopulation: Float!
    ): CountryPopulation!
    updateCountryPopulation(
      id: ID!
      country: String!
      year: String!
      area: Float!
      totalPopulation: Float!
    ): CountryPopulation!
    deleteCountryPopulation(id: ID!): CountryPopulation
  }
`;

export default typeDefs;
