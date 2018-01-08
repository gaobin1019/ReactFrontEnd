import React from 'react';
import { Tabs, Button } from 'antd';
import { GEO_OPTIONS, POS_KEY } from "../constants"

const TabPane = Tabs.TabPane;
const operations = <Button>New post</Button>;

export class Home extends React.Component {
    //life cycle method should not be class property
    //this location will not be changed through out the application for now
    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
            );
        } else {
            //geolocation is not available
            console.error('geolocation not supported')
        }
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);

        //destructor ES6
        const {latitude: lat, longitude: lon} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat: lat, lon: lon}, null, 4));
    }

    onFailedLoadGeoLocation = (err) => {
        console.log(err);
    }

    render() {
        return (
            <Tabs className="main-tabs" tabBarExtraContent={operations}>
                <TabPane tab="Post" key="1">
                    Content of tab 1
                </TabPane>
                <TabPane tab="Map" key="2">
                    Content of tab 2
                </TabPane>
            </Tabs>
        );
    }
}