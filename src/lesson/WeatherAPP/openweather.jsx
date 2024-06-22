import { useEffect, useState } from "react";
import { v4 as uuid, v4 } from "uuid";

const WeatherApp = ({ weatherData }) => {
  if (weatherData == null) {
    return (
      <div>
        <h1></h1>
      </div>
    );
  }
  return (
    <>
      <div
        className="weather-app-container"
        id={v4()}
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Weather in {weatherData?.name}</h1>
        <p>Temperature: {weatherData?.main?.temp} °C</p>
        <p>Feels like: {weatherData?.main?.feels_like} °C</p>
        <p>Min Temperature: {weatherData?.main?.temp_min} °C</p>
        <p>Max Temperature: {weatherData?.main?.temp_max} °C</p>
        <p>Pressure: {weatherData?.main?.pressure} hPa</p>
        <p>Humidity: {weatherData?.main?.humidity} %</p>
        <p>Wind Speed: {weatherData?.wind?.speed} m/s</p>
        <p>Wind Direction: {weatherData?.wind?.deg} °</p>
        <p>Visibility: {weatherData?.visibility} meters</p>
        <p>Cloudiness: {weatherData?.clouds?.all} %</p>
      </div>
    </>
  );
};

export default WeatherApp;
