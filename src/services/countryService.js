import httpService from "./httpService";

const apiEndPoint =
  "https://restcountries.eu/rest/v2/all?fields=name;capital;flag";
export const getCountriesList = () => {
  return httpService.get(apiEndPoint);
};
