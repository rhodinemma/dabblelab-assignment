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
        id: toString(id),
      },
      refetchQueries: [{ query: GET_COUNTRIES_DETAILS }],
    });
  };
  return (
    <>
      <tbody>
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {country}
          </th>

          <td className="py-4 px-6">{year}</td>
          <td className="py-4 px-6">{area}</td>
          <td className="py-4 px-6">{totalPopulation}</td>
          <td className="py-4 px-6">
            <a
              href="#"
              onClick={() => setSelectedId(id)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              View
            </a>
            &nbsp;&nbsp;
            <a
              href="/"
              onClick={() => removeCountry(id)}
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default Country;
