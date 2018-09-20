import React, {Component} from 'react';

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?&appid=1501996b962cfcc7fed8a29efdaab316&id={{CITY_ID}}";

export default class CityPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: null
        };
        this.getWeather.apply(this);
    }

    getWeather() {
        let url = weatherApiUrl.replace("{{CITY_ID}}", this.props.info.id);
        fetch(url).then(response => response.json()).then(data => {
            console.log('data:', data);
            this.setState({
                weather: data
            });
        }).catch(e => {
            console.error(e);
        })
    }

    render() {
        // console.log('props:', this.props);
        // console.log('state:', this.state);
        return (
            <div>
                <p>{this.props.info.city}</p>{this.state.weather ? (<p>Temp: {(this.state.weather.main.temp - 273.15).toFixed(2)} &deg;C</p>) : ""}
            </div>
        );
    }
}