import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import { POS_KEY } from "../constants";
import { AroundMarker } from "./AroundMarker";

class AroundMap extends React.Component {
    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY)); // for testing purpose
        return (
            <GoogleMap
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lon }}
            >
                <AroundMarker lat={lat} lon={lon}/>
                <AroundMarker lat={lat + 0.01} lon={lon + 0.01}/>
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));