import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_COUNTRY_POPULATION } from "../graphql/Mutation";
import { GET_COUNTRIES_DETAILS } from "../graphql/Query";
import { CountryContext } from "../CountryContext";

const Country = ({ id, country, year, area, totalPopulation }) => {
  const { selectedId, setSelectedId } = useContext(CountryContext);
  const [deleteCountryPopulation] = useMutation(DELETE_COUNTRY_POPULATION);
  const removeCountry = (id) => {
    deleteCountryPopulation({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: GET_COUNTRIES_DETAILS }],
    });
  };
  return (
    <>
      <a href="#" onClick={() => setSelectedId(id)}>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Year: {year}
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Country: {country}
            </h3>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Area (Square Kilometers): {area}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              Total Population: {totalPopulation}
            </p>
            <a
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-red rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-white-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              onClick={() => removeCountry(id)}
            >
              Delete record
            </a>
          </li>
        </ol>
      </a>
    </>
  );
};

export default Country;
