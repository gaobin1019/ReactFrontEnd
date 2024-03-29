import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
import { AroundMarker } from "./AroundMarker";
import {POS_KEY} from "../constants";

class AroundMap extends React.Component {
    getMapRef = (map) => {
        this.map = map;
    };

    reload = () => {
        const center = this.map.getCenter();
        const position = {lat: center.lat(), lon: center.lng()};
        this.props.getPosts(position, this.getRange());
    };

    getRange = () => {
        const google = window.google;
        const center = this.map.getCenter();
        const bounds = this.map.getBounds();
        if (center && bounds) {
            const ne = bounds.getNorthEast();
            const right = new google.maps.LatLng(center.lat(), ne.lng());

            return 0.000621371192 * google.maps.geometry.spherical.computeDistanceBetween(center, right);
        }
    };

    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                ref={this.getMapRef}
                onDragEnd={this.reload}
                onZoomChanged={this.reload}
                defaultZoom={11}
                defaultCenter={{ lat: lat, lng: lon }}
            >
                {this.props.posts ? this.props.posts.map((post, index) => {
                    return (
                        <AroundMarker post={post} key={index}/>
                    );
                }) : null}
            </GoogleMap>
        );
    }
}

export const WrappedAroundMap = withScriptjs(withGoogleMap(AroundMap));