import "./App.css";
import { useState } from "react";
import axios from "axios";
function App() {
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [data, setdata] = useState("");
  const fetchData = async () => {
    if (isNaN(Number(lat)) || isNaN(Number(long))) {
      setdata("Please enter valid numeric lat and lang please");
      return;
    }
    try {
      let data = await axios.get(
        `https://api.weather.gov/points/${Number(lat)},${Number(long)}`
      );
      let forecastData = await axios.get(data.data.properties.forecast);
      let { temperature, temperatureUnit, detailedForecast } =
        forecastData.data.properties.periods[0];
      let { city, state } = data.data.properties.relativeLocation.properties;
      data.data.properties.temperature = temperature;
      data.data.properties.temperatureInCelcius = ((temperature - 32) * 5) / 9;

      let { timeZone } = data.data.properties;
      let { updated } = forecastData.data.properties;
      let days = [];
      forecastData.data.properties.periods.map((item) => {
        if (item.temperature > 85) {
          days.push(item.startTime.split("T")[0]);
        }
      });

      setdata(
        `Temp:${temperature}${temperatureUnit} Temp in Celcius=${
          ((temperature - 32) * 5) / 9
        }C \t City:${city}\t  State:${state}\t TimeZone:${timeZone} \t  time=${
          updated.split("T")[1].split("+")[0]
        } Heat Advisory:${detailedForecast} Days on temperature above 85F are:${days.map(
          (item) => item
        )}`
      );
    } catch (e) {
      console.log(e);
      setdata("Data not avaliable for inserted lat and long");
      // setlat();
      // setlong();
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <input
          value={lat}
          onChange={(e) => setlat(e.target.value)}
          style={{ marginRight: 20 }}
          placeholder="latitude"
          type="Number"
        />
        <input
          value={long}
          onChange={(e) => setlong(e.target.value)}
          type="Number"
          placeholder="longitude"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <div>
          <button role="button" onClick={fetchData}>
            {" "}
            Submit
          </button>
        </div>
        <div style={{ width: "250px" }}>{data}</div>
      </div>
    </>
  );
}

export default App;
