import React from "react";
import LocationForm from "./LocationForm";
import Weather from "./Weather";
import "./MainContent.scss";

const DEFAULT_CITY = "Kladno";

export default class MainContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = { city: DEFAULT_CITY };
    }

    handleCity = (city) => {
        console.debug(`[${MainContent.name}] City changed`, city);
        this.setState({ city });
    }

    render() {
        const { city } = this.state;
        return (
            <main>
                <LocationForm city={city}
                              onCityChange={this.handleCity}></LocationForm>

                <Weather city={city}/>
            </main>
        );
    }
}
