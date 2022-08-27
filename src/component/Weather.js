import React from "react";
import openWeatherService from "../service/open-weather-service";
import "./Weather.scss";
import WeatherStats from "./WeatherStats";
import { Alert, LinearProgress } from "@mui/material";

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            error: null,
            weather: null
        };
    }

    componentDidMount() {
        this.fetchWeather();
    }

    componentDidUpdate(prevProps) {
        if (this.props.city !== prevProps.city) {
            this.fetchWeather();
        }
    }

    render() {
        const { loaded, error, weatherResponse } = this.state;
        if (!loaded) {
            return <div className="weather">
                <LinearProgress />
            </div>;
        } else if (error) {
            console.log(error);
            if (error.message) {
                return <div className="weather">
                    <Alert severity="error">{error.message}</Alert>
                </div>;
            }
        } else if (weatherResponse && weatherResponse.message && weatherResponse.cod > 299) {
            return <div className="weather">
                <Alert severity="error">{weatherResponse.cod}: {weatherResponse.message}</Alert>
            </div>;
        } else if (weatherResponse) {
            return <div className="weather">
                <WeatherStats weatherData={weatherResponse}></WeatherStats>
            </div>;
        }
    }

    fetchWeather() {
        return openWeatherService
            .currentWeather(this.props.city, null, null, "058654ddce9d980e3f2d3e84f1a3f2dc", "cz", "metric")
            .then((weatherResponse) => {
                this.setState({
                    loaded: true,
                    weatherResponse
                });
            }, (error) => {
                this.setState({
                    loaded: true,
                    error
                });
            });
    }
}

export default Weather;
