import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./LocationForm.scss";

export default class LocationForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            city: this.props.city
        };
    }

    handleSubmit = (event) => {
        console.debug(`[${LocationForm.name}] handle submit`, this.state);
        event.preventDefault();
        const { city } = this.state;
        this.props.onCityChange(city);
    }

    setCity = (event) => {
        console.debug(`[${LocationForm.name}] set city`, event.target.value);
        this.setState({ city: event.target.value });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.city !== this.props.city) {
            console.debug(`[${LocationForm.name}] Props changed, state will be changed`, this.props);
            this.setState({
                city: this.props.city
            });
        }
    }

    render() {
        const { city } = this.state;
        return (
            <section className="location-form">
                <form onSubmit={this.handleSubmit}>
                    <TextField variant="standard" size="small"
                               className="city-field"
                               label="City" type="text" value={city} name="city" onChange={this.setCity}/>
                    <Button variant="contained" className="submit-button" type="submit">Locate it!</Button>
                </form>
            </section>
        );
    }
}
