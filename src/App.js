import React, {Component} from 'react';
import ReactMapGL, {Popup, Marker, NavigationControl} from 'react-map-gl';
import CityMarker from "./components/CityMarker";
import CityPopup from "./components/CityPopup";
import 'mapbox-gl/dist/mapbox-gl.css';

const controlStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'
};

const cities = [
    {"id": 5419396, "city": "New York", "latitude": 40.6643, "longitude": -73.9385},
    {"id": 5809844, "city": "Seattle", "latitude": 47.6205, "longitude": -122.3509},
    {"id": 5128638, "city": "Denver", "latitude": 39.7618, "longitude": -104.8806},
];

export default class MyMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                latitude: 37.785164,
                longitude: -100,
                zoom: 3.5,
                width: window.innerWidth - 20,
                height: window.innerHeight - 20,
            },
            popupInfo: null
        };
    }

    // componentDidMount() {
    //     window.addEventListener('resize', this._resize);
    //     this._resize();
    // }
    //
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this._resize);
    // }
    //
    // _resize = () => {
    //     this.setState({
    //         viewport: {
    //             ...this.state.viewport,
    //             width: this.props.width || window.innerWidth,
    //             height: this.props.height || window.innerHeight
    //         }
    //     });
    // };

    _updateViewport = (viewport) => this.setState({viewport});

    _renderPopup() {
        const {popupInfo} = this.state;

        return popupInfo && (
            <Popup tipSize={5}
                   anchor="top"
                   longitude={popupInfo.longitude}
                   latitude={popupInfo.latitude}
                   onClose={() => this.setState({popupInfo: null})} >
                <CityPopup info={popupInfo} />
            </Popup>
        );
    };

    render() {

        return (
            <ReactMapGL
                mapboxApiAccessToken="pk.eyJ1Ijoic2hhbmUtcGlvbmVlciIsImEiOiJjampyN2YwZ3MzeGQxM3JteGh6YWM3Yjg5In0.joFZOIVkzx9ZVpX5B0BsZA"
                mapStyle="mapbox://styles/mapbox/basic-v9"
                {...this.state.viewport}
                onViewportChange={this._updateViewport} >

                {
                    cities.map(city => {
                        return (
                            <Marker key={city.id}
                                    latitude={city.latitude}
                                    longitude={city.longitude}>
                                <CityMarker {...city} size={18} onClick={() => this.setState({popupInfo: city})}/>
                            </Marker>
                        )
                    })
                }

                { this._renderPopup() }

                <div className="nav" style={controlStyle}>
                    <NavigationControl onViewportChange={this._updateViewport} />
                </div>

            </ReactMapGL>
        );
    };
}