import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { rest } from "msw";

import { setupServer } from "msw/node";
//mocking api call
const server = setupServer(
  rest.get("https://api.weather.gov/points/33.749,-84.388", (req, res, ctx) => {
    return res(
      ctx.json({
        "@context": [
          "https://geojson.org/geojson-ld/geojson-context.jsonld",
          {
            "@version": "1.1",
            wx: "https://api.weather.gov/ontology#",
            s: "https://schema.org/",
            geo: "http://www.opengis.net/ont/geosparql#",
            unit: "http://codes.wmo.int/common/unit/",
            "@vocab": "https://api.weather.gov/ontology#",
            geometry: {
              "@id": "s:GeoCoordinates",
              "@type": "geo:wktLiteral",
            },
            city: "s:addressLocality",
            state: "s:addressRegion",
            distance: {
              "@id": "s:Distance",
              "@type": "s:QuantitativeValue",
            },
            bearing: {
              "@type": "s:QuantitativeValue",
            },
            value: {
              "@id": "s:value",
            },
            unitCode: {
              "@id": "s:unitCode",
              "@type": "@id",
            },
            forecastOffice: {
              "@type": "@id",
            },
            forecastGridData: {
              "@type": "@id",
            },
            publicZone: {
              "@type": "@id",
            },
            county: {
              "@type": "@id",
            },
          },
        ],
        id: "https://api.weather.gov/points/33.7,-84.3",
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-84.299999999999997, 33.700000000000003],
        },
        properties: {
          "@id": "https://api.weather.gov/points/33.7,-84.3",
          "@type": "wx:Point",
          cwa: "FFC",
          forecastOffice: "https://api.weather.gov/offices/FFC",
          gridId: "FFC",
          gridX: 53,
          gridY: 84,
          forecast: "https://api.weather.gov/gridpoints/FFC/53,84/forecast",
          forecastHourly:
            "https://api.weather.gov/gridpoints/FFC/53,84/forecast/hourly",
          forecastGridData: "https://api.weather.gov/gridpoints/FFC/53,84",
          observationStations:
            "https://api.weather.gov/gridpoints/FFC/53,84/stations",
          relativeLocation: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-84.311976000000001, 33.707017],
            },
            properties: {
              city: "Gresham Park",
              state: "GA",
              distance: {
                value: 1355.0350113873999,
                unitCode: "unit:m",
              },
              bearing: {
                value: 125,
                unitCode: "unit:degrees_true",
              },
            },
          },
          forecastZone: "https://api.weather.gov/zones/forecast/GAZ045",
          county: "https://api.weather.gov/zones/county/GAC089",
          fireWeatherZone: "https://api.weather.gov/zones/fire/GAZ045",
          timeZone: "America/New_York",
          radarStation: "KFFC",
        },
      })
    );
  }),
  rest.get(
    "https://api.weather.gov/gridpoints/FFC/53,84/forecast",
    (req, res, ctx) =>
      res(
        ctx.json({
          "@context": [
            "https://geojson.org/geojson-ld/geojson-context.jsonld",
            {
              "@version": "1.1",
              wx: "https://api.weather.gov/ontology#",
              geo: "http://www.opengis.net/ont/geosparql#",
              unit: "http://codes.wmo.int/common/unit/",
              "@vocab": "https://api.weather.gov/ontology#",
            },
          ],
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-84.312493399999994, 33.715860399999997],
                [-84.314630099999988, 33.693356299999998],
                [-84.287586599999983, 33.691576900000001],
                [-84.285444499999983, 33.714080799999998],
                [-84.312493399999994, 33.715860399999997],
              ],
            ],
          },
          properties: {
            updated: "2021-09-10T18:26:17+00:00",
            units: "us",
            forecastGenerator: "BaselineForecastGenerator",
            generatedAt: "2021-09-10T20:01:25+00:00",
            updateTime: "2021-09-10T18:26:17+00:00",
            validTimes: "2021-09-10T12:00:00+00:00/P8DT1H",
            elevation: {
              value: 270.96719999999999,
              unitCode: "unit:m",
            },
            periods: [
              {
                number: 1,
                name: "This Afternoon",
                startTime: "2021-09-10T16:00:00-04:00",
                endTime: "2021-09-10T18:00:00-04:00",
                isDaytime: true,
                temperature: 85,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "5 mph",
                windDirection: "E",
                icon: "https://api.weather.gov/icons/land/day/few?size=medium",
                shortForecast: "Sunny",
                detailedForecast:
                  "Sunny, with a high near 85. East wind around 5 mph.",
              },
              {
                number: 2,
                name: "Tonight",
                startTime: "2021-09-10T18:00:00-04:00",
                endTime: "2021-09-11T06:00:00-04:00",
                isDaytime: false,
                temperature: 63,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "5 mph",
                windDirection: "E",
                icon: "https://api.weather.gov/icons/land/night/few?size=medium",
                shortForecast: "Mostly Clear",
                detailedForecast:
                  "Mostly clear, with a low around 63. East wind around 5 mph.",
              },
              {
                number: 3,
                name: "Saturday",
                startTime: "2021-09-11T06:00:00-04:00",
                endTime: "2021-09-11T18:00:00-04:00",
                isDaytime: true,
                temperature: 85,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "5 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/day/few?size=medium",
                shortForecast: "Sunny",
                detailedForecast:
                  "Sunny, with a high near 85. Southeast wind around 5 mph.",
              },
              {
                number: 4,
                name: "Saturday Night",
                startTime: "2021-09-11T18:00:00-04:00",
                endTime: "2021-09-12T06:00:00-04:00",
                isDaytime: false,
                temperature: 63,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 to 5 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/night/few?size=medium",
                shortForecast: "Mostly Clear",
                detailedForecast:
                  "Mostly clear, with a low around 63. Southeast wind 0 to 5 mph.",
              },
              {
                number: 5,
                name: "Sunday",
                startTime: "2021-09-12T06:00:00-04:00",
                endTime: "2021-09-12T18:00:00-04:00",
                isDaytime: true,
                temperature: 88,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 to 5 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/day/few?size=medium",
                shortForecast: "Sunny",
                detailedForecast:
                  "Sunny, with a high near 88. Southeast wind 0 to 5 mph.",
              },
              {
                number: 6,
                name: "Sunday Night",
                startTime: "2021-09-12T18:00:00-04:00",
                endTime: "2021-09-13T06:00:00-04:00",
                isDaytime: false,
                temperature: 65,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 to 5 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/night/few?size=medium",
                shortForecast: "Mostly Clear",
                detailedForecast: "Mostly clear, with a low around 65.",
              },
              {
                number: 7,
                name: "Monday",
                startTime: "2021-09-13T06:00:00-04:00",
                endTime: "2021-09-13T18:00:00-04:00",
                isDaytime: true,
                temperature: 91,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 to 5 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/day/few?size=medium",
                shortForecast: "Sunny",
                detailedForecast: "Sunny, with a high near 91.",
              },
              {
                number: 8,
                name: "Monday Night",
                startTime: "2021-09-13T18:00:00-04:00",
                endTime: "2021-09-14T06:00:00-04:00",
                isDaytime: false,
                temperature: 67,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/night/sct?size=medium",
                shortForecast: "Partly Cloudy",
                detailedForecast: "Partly cloudy, with a low around 67.",
              },
              {
                number: 9,
                name: "Tuesday",
                startTime: "2021-09-14T06:00:00-04:00",
                endTime: "2021-09-14T18:00:00-04:00",
                isDaytime: true,
                temperature: 90,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 to 5 mph",
                windDirection: "S",
                icon: "https://api.weather.gov/icons/land/day/sct?size=medium",
                shortForecast: "Mostly Sunny",
                detailedForecast: "Mostly sunny, with a high near 90.",
              },
              {
                number: 10,
                name: "Tuesday Night",
                startTime: "2021-09-14T18:00:00-04:00",
                endTime: "2021-09-15T06:00:00-04:00",
                isDaytime: false,
                temperature: 67,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 to 5 mph",
                windDirection: "S",
                icon: "https://api.weather.gov/icons/land/night/sct?size=medium",
                shortForecast: "Partly Cloudy",
                detailedForecast: "Partly cloudy, with a low around 67.",
              },
              {
                number: 11,
                name: "Wednesday",
                startTime: "2021-09-15T06:00:00-04:00",
                endTime: "2021-09-15T18:00:00-04:00",
                isDaytime: true,
                temperature: 87,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 to 5 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/day/tsra_hi,30?size=medium",
                shortForecast: "Chance Showers And Thunderstorms",
                detailedForecast:
                  "A chance of showers and thunderstorms after 8am. Mostly sunny, with a high near 87. Chance of precipitation is 30%.",
              },
              {
                number: 12,
                name: "Wednesday Night",
                startTime: "2021-09-15T18:00:00-04:00",
                endTime: "2021-09-16T06:00:00-04:00",
                isDaytime: false,
                temperature: 68,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "0 to 5 mph",
                windDirection: "SE",
                icon: "https://api.weather.gov/icons/land/night/tsra_hi,30?size=medium",
                shortForecast: "Chance Showers And Thunderstorms",
                detailedForecast:
                  "A chance of showers and thunderstorms. Mostly cloudy, with a low around 68. Chance of precipitation is 30%.",
              },
              {
                number: 13,
                name: "Thursday",
                startTime: "2021-09-16T06:00:00-04:00",
                endTime: "2021-09-16T18:00:00-04:00",
                isDaytime: true,
                temperature: 86,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "5 to 10 mph",
                windDirection: "E",
                icon: "https://api.weather.gov/icons/land/day/tsra_hi,40?size=medium",
                shortForecast: "Chance Showers And Thunderstorms",
                detailedForecast:
                  "A chance of showers and thunderstorms. Partly sunny, with a high near 86. Chance of precipitation is 40%.",
              },
              {
                number: 14,
                name: "Thursday Night",
                startTime: "2021-09-16T18:00:00-04:00",
                endTime: "2021-09-17T06:00:00-04:00",
                isDaytime: false,
                temperature: 69,
                temperatureUnit: "F",
                temperatureTrend: null,
                windSpeed: "5 mph",
                windDirection: "E",
                icon: "https://api.weather.gov/icons/land/night/tsra_hi,40/tsra_hi,20?size=medium",
                shortForecast: "Chance Showers And Thunderstorms",
                detailedForecast:
                  "A chance of showers and thunderstorms. Mostly cloudy, with a low around 69. Chance of precipitation is 40%.",
              },
            ],
          },
        })
      )
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders and call an api to get data ", async () => {
  //checkinf the rendering of an app
  render(<App />);
  //etering the value
  userEvent.type(screen.getByPlaceholderText("latitude"), "33.749");
  userEvent.type(screen.getByPlaceholderText("longitude"), "-84.388");

  userEvent.click(screen.getByRole("button"));
  //click and calling an api
  await waitFor(() => screen.getByText(/Temp in Celcius/gi));
  //testingou the result
});
