import { useState, useEffect } from "react";
import axios from "axios";

export const Weather = ({ city }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&elements=temp%2Cconditions%2Cdescription%2Cicon&include=days&key=HUK84KB3EW3PQZWG6M8M76PWM&contentType=json`,
        {
          method: "GET",
          headers: {},
        }
      )
      .then((res) => setData(res.data.days[0]));
    console.log(city);
  }, [city]);
  if (data !== null) {
    return (
      <div>
        <h2>Weather</h2>
        <p>{data.temp}&deg;C</p>
        <p>{data.description}</p>
      </div>
    );
  }
};
