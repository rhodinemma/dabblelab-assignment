import { gql } from "@apollo/client";

export const GET_COUNTRIES_DETAILS = gql`
  {
    getCountriesDetails {
      id
      country
      year
      area
      totalPopulation
    }
  }
`;

export const GET_COUNTRY_DETAILS = gql`
    {
        query getCountryDetail($id: ID){
            getCountryDetail(id: $id){
                id
                country
                year
                area
                totalPopulation
            }
        }
    }
`;
