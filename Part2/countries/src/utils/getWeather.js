import axios from "axios";
export const getWeather = (city) => {
  console.log(city);
  const response = axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&elements=temp%2Cconditions%2Cdescription%2Cicon&include=days&key=HUK84KB3EW3PQZWG6M8M76PWM&contentType=json`,
    {
      method: "GET",
      headers: {},
    }
  );
  return response.then((res) => res.data);
};
