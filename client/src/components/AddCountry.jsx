import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_COUNTRY_POPULATION,
  UPDATE_COUNTRY_POPULATION,
} from "../graphql/Mutation";
import { GET_COUNTRIES_DETAILS, GET_COUNTRY_DETAILS } from "../graphql/Query";
import { CountryContext } from "../CountryContext";

const AddCountry = () => {
  const [detail, setDetails] = useState({
    country: "",
    year: "",
    area: 0,
    totalPopulation: 0,
  });
  const { selectedId, setSelectedId } = useContext(CountryContext);
  const [updateCountryPopulation] = useMutation(UPDATE_COUNTRY_POPULATION);
  const { data } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { id: selectedId },
    onCompleted: (data) => setDetails(data?.getCountryDetail),
  });
  console.log(detail);

  const [addCountryPopulation] = useMutation(ADD_COUNTRY_POPULATION);
  const onSubmit = (e) => {
    if (detail.country && detail.year === "") {
      alert("Please fill all fields! Thank you");
      return;
    }
    e.preventDefault();
    if (selectedId === 0) {
      addCountryPopulation({
        variables: {
          country: detail.country,
          year: detail.year,
          area: parseFloat(detail.area),
          totalPopulation: parseFloat(detail.totalPopulation),
        },
        refetchQueries: [{ query: GET_COUNTRIES_DETAILS }],
      });
      setDetails({
        country: "",
        year: "",
        area: 0,
        totalPopulation: 0,
      });
    } else {
      updateCountryPopulation({
        variables: {
          id: selectedId,
          country: detail.country,
          year: detail.year,
          area: parseFloat(detail.area),
          totalPopulation: parseFloat(detail.totalPopulation),
        },
        refetchQueries: [{ query: GET_COUNTRIES_DETAILS }],
      });
      setDetails({
        country: "",
        year: "",
        area: 0,
        totalPopulation: 0,
      });
      setSelectedId(0);
    }
  };
  return (
    <div className="bg-blue-200 min-h-screen flex items-center">
      <div className="bg-white p-10 md:w-2/3 lg:w-2/3 mx-auto rounded">
        <form onSubmit={onSubmit}>
          <div className="flex items-center mb-5">
            <label className="w-20 inline-block text-right mr-4 text-gray-500 text-gray-500">
              Country
            </label>
            <input
              type="text"
              placeholder="Your country name goes here"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-blue-400"
              value={detail.country}
              onChange={(e) =>
                setDetails({ ...detail, country: e.target.value })
              }
            />
          </div>

          <div className="flex items-center mb-10">
            <label className="w-20 inline-block text-right mr-4 text-gray-500 text-gray-500">
              Year
            </label>
            <input
              type="text"
              placeholder="Year goes here"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-blue-400"
              value={detail.year}
              onChange={(e) => setDetails({ ...detail, year: e.target.value })}
            />
          </div>

          <div className="flex items-center mb-10">
            <label className="w-20 inline-block text-right mr-4 text-gray-500 text-gray-500">
              Area (Square Kilometers)
            </label>
            <input
              type="number"
              placeholder="Area of the population goes here"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-blue-400"
              value={detail.area}
              onChange={(e) => setDetails({ ...detail, area: e.target.value })}
            />
          </div>

          <div className="flex items-center mb-10">
            <label className="w-20 inline-block text-right mr-4 text-gray-500 text-gray-500">
              Total Population
            </label>
            <input
              type="number"
              placeholder="The overall total population goes here"
              className="border-b-2 border-gray-400 flex-1 py-2 placeholder-gray-300 outline-none focus:border-blue-400"
              value={detail.totalPopulation}
              onChange={(e) =>
                setDetails({ ...detail, totalPopulation: e.target.value })
              }
            />
          </div>
          <div className="text-center">
            <button
              className="py-3 px-8 bg-blue-500 text-blue-100 font-bold rounded"
              type="submit"
            >
              {selectedId === 0
                ? "Add Country Details"
                : "Update Country Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
