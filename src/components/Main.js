import React, { Component } from "react";
import { Register } from "./register";
import { Login } from "./login";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./Home";

export class Main extends Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home" /> : <Login />;
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Home /> : <Redirect to="/login" />; //redirect render '/url' and changed url
    }

    getRoot = () => {
        return <Redirect to="/login" />;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={ this.getRoot }/>
                    <Route path="/login" render={ this.getLogin }/>
                    <Route path="/home" render={ this.getHome }/>
                    <Route path="/register" component={ Register }/>
                    <Route component={ Login }/>
                </Switch>
            </div>
        );
    }
}