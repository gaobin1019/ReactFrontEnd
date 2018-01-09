import $ from 'jquery';
import React from 'react';
import { Tabs, Button, Spin } from 'antd';
import { AUTH_PREFIX, API_ROOT, GEO_OPTIONS, POS_KEY, TOKEN_KEY } from "../constants"

const TabPane = Tabs.TabPane;
const operations = <Button>New post</Button>;

export class Home extends React.Component {
    state = {
        posts: [],
        isLoadingPosts: false,
        isLoadingGeoLocation: false,
        loadingErrorMessage: '',
    };

    //life cycle method should not be class property
    //this location will not be changed through out the application for now
    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({
                isLoadingGeoLocation: true,
                loadingErrorMessage: '',
            });
            navigator.geolocation.getCurrentPosition(
                this.onSuccessLoadGeoLocation,
                this.onFailedLoadGeoLocation,
                GEO_OPTIONS
            );
        } else {
            //geolocation is not available
            this.setState({
                    isLoadingGeoLocation: false,
                    loadingErrorMessage: 'geolocation not supported',
            });
        }
    }

    getPosts = () => {
        this.setState({isLoadingPosts: true});
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        $.ajax({
            method: 'GET',
            url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=200`,
            headers: {
              'Authorization': `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
            },
        }).then(
            (response) => {
                console.log(response);
                this.setState({
                    posts: response,
                    isLoadingPosts: false,
                });
            },
            (err) => {
                console.log(err.responseText);
                this.setState({
                    loadingErrorMessage: err.responseText,
                    isLoadingPosts: false,
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                this.setState({
                    loadingErrorMessage: err,
                    isLoadingPosts: false,
                });
            }
        );
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({
            isLoadingGeoLocation: false,
            loadingErrorMessage: '',
        });

        //destructor ES6
        const {latitude: lat, longitude: lon} = position.coords;
        localStorage.setItem(POS_KEY, JSON.stringify({lat: lat, lon: lon}, null, 4));
        this.getPosts();
    }

    onFailedLoadGeoLocation = (err) => {
        console.log(err);
        this.setState({
            isLoadingGeoLocation: false,
            loadingErrorMessage: 'failed to load geolocation',
        });
    }

    getGallery = () => {
        if (this.state.loadingErrorMessage) {
            return (
                <div>{this.state.loadingErrorMessage}</div>
            );
        } else if (this.state.isLoadingGeoLocation) {
            return (
                <Spin tip="Loading geolocation"></Spin>
            );
        } else if (this.state.isLoadingPosts) {
            return (
                <Spin tip="Loading posts near your location"></Spin>
            );
        }

        return null;
    }
    render() {
        return (
            <Tabs className="main-tabs" tabBarExtraContent={operations}>
                <TabPane tab="Post" key="1">
                    {this.getGallery()}
                </TabPane>
                <TabPane tab="Map" key="2">
                    Content of tab 2
                </TabPane>
            </Tabs>
        );
    }
}