import React from "react";
import {
    Marker,
    InfoWindow,
} from "react-google-maps";

export class AroundMarker extends React.Component {
    state = {
        isOpen: false,
    };

    onToggleOpen = () => {
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen
            };
        });
    };

    render() {
        return (
            <Marker
                position={{ lat: this.props.lat, lng: this.props.lon }}
                onClick={this.onToggleOpen}
            >
                {this.state.isOpen ?
                    <InfoWindow onCloseClick={this.onToggleOpen}>
                        <div>test</div>
                    </InfoWindow> :
                    null
                }
            </Marker>
        );
    }
}