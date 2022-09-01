import React from "react";
import LocationForm from "./LocationForm";
import "./MainContent.scss";
import openWeatherService from "../service/open-weather-service";
import { Alert } from "@mui/material";
import WeatherStats from "./WeatherStats";
import cityService from "../service/city-service";

const DEFAULT_CITY = "Kladno";

export default class MainContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            city: cityService.getDefaultCity(),
            weatherData: null,
            error: null
        };
    }

    handleCity = (city) => {
        console.debug(`[${MainContent.name}] City changed`, city);
        this.setState({ city, weatherData: null, error: null });
        cityService.setDefaultCity(city);
        this.fetchWeather();
    }

    componentDidMount() {
        this.fetchWeather();
    }

    fetchWeather() {
        this.props.onLoadingChange(true);
        setTimeout(() => {
            openWeatherService
                .currentWeather(this.state.city, null, null, "058654ddce9d980e3f2d3e84f1a3f2dc", null, "metric")
                .then((weatherData) => {
                    this.props.onLoadingChange(false);
                    this.setState({
                        weatherData
                    });
                }, (error) => {
                    this.props.onLoadingChange(false);
                    this.setState({
                        error
                    });
                });
        }, 1000);
    }

    render() {
        const { city, weatherData, error } = this.state;
        if (!weatherData) {
            return (
                <main>
                    <LocationForm city={city}
                                  onCityChange={this.handleCity}></LocationForm>
                </main>
            );
        } else if (error) {
            return (
                <main>
                    <LocationForm city={city}
                                  onCityChange={this.handleCity}></LocationForm>
                    <Alert className="spacer" severity="error">{error.message || "Something went wrong"}</Alert>
                </main>
            );
        } else if (weatherData && weatherData.message && weatherData.cod > 299) {
            return (
                <main>
                    <LocationForm city={city}
                                  onCityChange={this.handleCity}></LocationForm>
                    <Alert className="spacer" severity="error">{weatherData.cod}: {weatherData.message}</Alert>
                </main>
            );
        } else {
            return (
                <main>
                    <LocationForm city={city}
                                  onCityChange={this.handleCity}></LocationForm>
                    <WeatherStats className="spacer" weatherData={weatherData}></WeatherStats>
                </main>
            );
        }
    }
}
