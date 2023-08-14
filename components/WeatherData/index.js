import React, { useState, useEffect } from "react";
import { WeatherInfoWrapper, InfoRow, InfoItem } from "./style";
import Image from "next/image";

export default function WeatherDisplay({ searchKey }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [marineWeather, setMarineWeather] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [currentResponse, forecastResponse, marineResponse] =
          await Promise.all([
            fetch(`/api/weather_current_data?q=${searchKey}`),
            fetch(`/api/weather_forecast_data?q=${searchKey}`),
            fetch(`/api/weather_marine_data?q=${searchKey}`),
          ]);

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        const marineData = await marineResponse.json();

        setCurrentWeather(currentData);
        setForecastWeather(forecastData);
        setMarineWeather(marineData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }

    fetchData();
  }, [searchKey]);

  return (
    <WeatherInfoWrapper aria-label="Weather information">
      <h2>WEATHER INFORMATION</h2>
      {!currentWeather ||
      !forecastWeather ||
      !forecastWeather.forecast ||
      !forecastWeather.forecast.forecastday ||
      !marineWeather ? (
        <div
          style={{ fontSize: "1.0rem", color: "#da2001", textAlign: "left" }}
        >
          NO WEATHER DATA AVAILABLE
        </div>
      ) : (
        <>
          <InfoRow>
            <InfoItem aria-label="Sunrise time">
              Sunrise:{" "}
              {marineWeather?.forecast?.forecastday?.[0]?.astro?.sunrise ||
                "N/A"}
            </InfoItem>
            <InfoItem aria-label="Sunset time">
              Sunset:{" "}
              {marineWeather?.forecast?.forecastday?.[0]?.astro?.sunset ||
                "N/A"}
            </InfoItem>
          </InfoRow>

          <InfoRow>
            <InfoItem
              aria-label={`Temperature: ${
                forecastWeather.forecast.forecastday[0].hour[
                  new Date().getHours()
                ].temp_c
              }°C`}
            >
              Temperature:{" "}
              {
                forecastWeather.forecast.forecastday[0].hour[
                  new Date().getHours()
                ].temp_c
              }
              °C
            </InfoItem>
            <Image
              src={
                forecastWeather.forecast.forecastday[0].hour[
                  new Date().getHours()
                ].condition.icon
              }
              alt="Weather Condition"
              width={30}
              height={30}
              unoptimized={true}
              aria-label="Weather condition icon"
            />
          </InfoRow>
          <InfoRow>
            <InfoItem
              aria-label={`UV Index: ${
                forecastWeather.forecast.forecastday[0].hour[
                  new Date().getHours()
                ].uv
              }`}
            >
              UV Index:{" "}
              {
                forecastWeather.forecast.forecastday[0].hour[
                  new Date().getHours()
                ].uv
              }
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem
              aria-label={`Water Temperature: ${
                marineWeather?.forecast?.forecastday?.[0]?.hour?.[0]
                  ?.water_temp_c || "N/A"
              }°C`}
            >
              Water Temperature:{" "}
              {marineWeather?.forecast?.forecastday?.[0]?.hour?.[0]
                ?.water_temp_c || "N/A"}
              °C
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem
              aria-label={`Swell Height: ${
                marineWeather?.forecast?.forecastday?.[0]?.hour?.[0]
                  ?.swell_ht_mt || "N/A"
              } meters`}
            >
              Swell Height:{" "}
              {marineWeather?.forecast?.forecastday?.[0]?.hour?.[0]
                ?.swell_ht_mt || "N/A"}{" "}
              m
            </InfoItem>
            <InfoItem
              aria-label={`Swell Period: ${
                marineWeather?.forecast?.forecastday?.[0]?.hour?.[0]
                  ?.swell_period_secs || "N/A"
              } seconds`}
            >
              Swell Period:{" "}
              {marineWeather?.forecast?.forecastday?.[0]?.hour?.[0]
                ?.swell_period_secs || "N/A"}{" "}
              s
            </InfoItem>
          </InfoRow>
          <InfoRow>
            <InfoItem
              aria-label={`Wind Speed: ${currentWeather.current.wind_kph} kph`}
            >
              Wind Speed: {currentWeather.current.wind_kph} kph
            </InfoItem>
            <InfoItem
              aria-label={`Wind Direction: ${currentWeather.current.wind_degree} / ${currentWeather.current.wind_dir}`}
            >
              Wind Dir: {currentWeather.current.wind_degree} /{" "}
              {currentWeather.current.wind_dir}
            </InfoItem>
          </InfoRow>
        </>
      )}
    </WeatherInfoWrapper>
  );
}
