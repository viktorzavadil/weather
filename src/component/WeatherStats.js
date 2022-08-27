import React from "react";
import moment from "moment";

import "./WeatherStats.scss";
import openWeatherService from "../service/open-weather-service";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const DEGREES_STEP = 22.5;

class WeatherStats extends React.Component {

    render() {
        const { name, weather, sys: { sunrise, sunset }, wind, main, visibility } = this.props.weatherData;
        const [ primaryWeather ] = weather;
        const weatherItems = [
            { title: "Descrition", value: primaryWeather.description },
            { title: "Humidity", value: `${main.humidity} %` },
            { title: "Pressure", value: `${main.pressure} hPa` },
            { title: "Wind", value: `${this.windDirectionEmoji(wind.deg)} ${wind.speed} m/s` },
            { title: "Visibility", value: `${visibility} m` },
            { title: "Sunrise", value: `${this.toDate(sunrise)}` },
            { title: "Sunset", value: `${this.toDate(sunset)}` },
        ];
        return (
            <TableContainer component={Paper} className="weather-stats">
                <Table aria-label="weather statistics">
                    <TableHead>
                        <TableRow>
                            <TableCell>{name}</TableCell>
                            <TableCell>
                                <img alt="weather image" className="image"
                                     src={openWeatherService.getIconUrl(primaryWeather.icon)}/>
                                <span>{main.temp} °C ({main.feels_like} °C pocit.)</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weatherItems.map((item) => {
                            return (<TableRow key={item.title}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {item.title}
                                </TableCell>
                                <TableCell>{item.value}</TableCell>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    toDate(dateSec) {
        return moment(dateSec * 1000).format('LTS');
    }

    windDirectionEmoji(val) {
        return "⬇↙↙⬅⬅↖↖⬆⬆↗↗➡➡↘↘⬇".charAt(Math.floor(val / 22.5));
    }
}

export default WeatherStats;
