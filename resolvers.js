import CountryPopulation from "./model/index.js";

const resolvers = {
  Query: {
    getCountriesDetails: async () => {
      const countries = await CountryPopulation.find();
      return countries;
    },
    getCountryDetail: async (_root, args) => {
      const country = await CountryPopulation.findById(args.id);
      return country;
    },
  },
  Mutation: {
    addCountryPopulation: async (_root, args) => {
      const newCountryPopulation = CountryPopulation({
        country: args.country,
        year: args.year,
        area: args.area,
        totalPopulation: args.totalPopulation,
      });
      await newCountryPopulation.save();
      return newCountryPopulation;
    },
    updateCountryPopulation: async (_root, args) => {
      const { id, country, year, area, totalPopulation } = args;
      const updatedCountryPopulation = {};
      if (country != undefined) {
        updatedCountryPopulation.country = country;
      }
      if (year != undefined) {
        updatedCountryPopulation.year = year;
      }
      if (area != undefined) {
        updatedCountryPopulation.area = area;
      }
      if (totalPopulation != undefined) {
        updatedCountryPopulation.totalPopulation = totalPopulation;
      }

      const update = await CountryPopulation.findByIdAndUpdate(
        id,
        updatedCountryPopulation,
        { new: true }
      );

      return update;
    },
    deleteCountryPopulation: async (_root, args) => {
      await CountryPopulation.findByIdAndDelete(args.id);
      return "Country population details deleted successfully!";
    },
  },
};

export default resolvers;
