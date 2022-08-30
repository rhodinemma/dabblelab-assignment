import mongoose from "mongoose";
const Schema = mongoose.Schema;

const countryPopulationSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  totalPopulation: {
    type: Number,
    required: true,
  },
});

const CountryPopulation = mongoose.model("countries", countryPopulationSchema);
export default CountryPopulation;
