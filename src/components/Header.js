import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import { Link } from "react-router-dom"

export class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title"><Link to="/login">Welcome to Around</Link></h1>
            </header>
        );
    }
}