import "./App.css";
import AddCountry from "./components/AddCountry";
import { GET_COUNTRIES_DETAILS } from "./graphql/Query";
import { useQuery } from "@apollo/client";
import Country from "./components/Country";
import { useState } from "react";
import { CountryContext } from "./CountryContext";

function App() {
  const [selectedId, setSelectedId] = useState(0);
  const { loading, error, data } = useQuery(GET_COUNTRIES_DETAILS);
  if (loading)
    return (
      <center>
        <p>Fetching data.....Please wait!</p>
      </center>
    );
  if (error) return <p>{error.message}</p>;
  console.log(data);
  return (
    <>
      <CountryContext.Provider value={{ selectedId, setSelectedId }}>
        <center>
          <h1 className="mb-4 mt-3 text-4xl font-extrabold tracking-tight leading-none text-gray-900 sm:px-40 md:text-5xl lg:text-6xl dark:text-white">
            Dabble Lab Assignment
          </h1>
        </center>

        <AddCountry />

        <center>
          {data?.getCountriesDetails.map((value) => (
            <Country
              key={value.id}
              id={value.id}
              country={value.country}
              year={value.year}
              area={value.area}
              totalPopulation={value.totalPopulation}
            />
          ))}
        </center>
      </CountryContext.Provider>
    </>
  );
}

export default App;
