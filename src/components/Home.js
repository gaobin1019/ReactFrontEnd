import $ from 'jquery';
import React from 'react';
import { Tabs, Spin } from 'antd';
import { Gallery } from "./Gallery";
import { CreatePostButton } from "./CreatePostButton"
import { AUTH_PREFIX, API_ROOT, GEO_OPTIONS, POS_KEY, TOKEN_KEY } from "../constants";

export class Home extends React.Component {
    state = {
        posts: [],
        isLoadingPosts: false,
        isLoadingGeoLocation: false,
        error: '',
    };

    //life cycle method should not be class property
    //this location will not be changed through out the application for now
    componentDidMount() {
        if ("geolocation" in navigator) {
            this.setState({
                isLoadingGeoLocation: true,
                error: '',
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
                    error: 'geolocation not supported',
            });
        }
    }

    getPosts = () => {
        this.setState({isLoadingPosts: true});
        const {lat, lon} = JSON.parse(localStorage.getItem(POS_KEY));
        return $.ajax({
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
                    error: '',
                });
            },
            (err) => {
                console.log(err.responseText);
                this.setState({
                    error: err.responseText,
                    isLoadingPosts: false,
                });
            }
        ).catch(
            (err) => {
                console.log(err);
                this.setState({
                    error: err,
                    isLoadingPosts: false,
                });
            }
        );
    }

    onSuccessLoadGeoLocation = (position) => {
        console.log(position);
        this.setState({
            isLoadingGeoLocation: false,
            error: '',
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
            error: 'failed to load geolocation',
        });
    }

    getGallery = () => {
        if (this.state.error) {
            return (
                <div>{this.state.error}</div>
            );
        } else if (this.state.isLoadingGeoLocation) {
            return (
                <Spin tip="Loading geolocation" className={""} indicator={""}/>
            );
        } else if (this.state.isLoadingPosts) {
            return (
                <Spin tip="Loading posts" className={""} indicator={""}/>
            );
        } else if (this.state.posts) {
            const images = this.state.posts.map((post) => (
                 {
                    user: post.user,
                    src: post.url,
                    thumbnail: post.url,
                    thumbnailWidth: 400,
                    thumbnailHeight: 300,
                    caption: post.message,
                }
            ));

            //console.log(images);
            return (
                <Gallery images={images}/>
            );
        }

        return null;
    }
    render() {
        const createPostButton = <CreatePostButton loadNearbyPosts={this.getPosts} />;
        const TabPane = Tabs.TabPane;

        return (
            <Tabs className="main-tabs" tabBarExtraContent={createPostButton}>
                <TabPane tab="Posts around" key="1">
                    {this.getGallery()}
                </TabPane>
                <TabPane tab="Map" key="2">
                    Content of tab 2
                </TabPane>
            </Tabs>
        );
    }
}