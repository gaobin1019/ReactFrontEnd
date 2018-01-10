import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import {POS_KEY} from "../constants";

class AroundMap extends React.Component {
    state = {
        isOpen: false,
    };

    onToggleOpen = () => {
        this.setState((prevState) => ( { isOpen: !prevState.isOpen } ));
    };

    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lon }}
            >
                <Marker
                    position={{ lat: lat, lng: lon }}
                    onClick={this.onToggleOpen}
                >
                    {this.state.isOpen ?
                        <InfoWindow onCloseClick={this.onToggleOpen}>
                            <div>asdf</div>
                        </InfoWindow> :
                        null
                    }
                </Marker>
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));