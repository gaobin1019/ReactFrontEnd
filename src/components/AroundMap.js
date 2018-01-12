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

    onDragEnd = () => {
        const center = this.map.getCenter();
        const position = {lat: center.lat(), lon: center.lng()};
        this.props.getPosts(position);
    };

    render() {
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                ref={this.getMapRef}
                onDragEnd={this.onDragEnd}
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