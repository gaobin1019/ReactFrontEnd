import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import PropTypes from "prop-types";
import { Icon } from "antd";
import { Link } from "react-router-dom";


export class Header extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        handleLogout: PropTypes.func.isRequired
    };

    render() {
        return (
            <header className="App-header">
                <Link to="/login">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Around</h1>
                </Link>
                {this.props.isLoggedIn ?
                    <a className="logout"
                       onClick={this.props.handleLogout}
                    >
                        <Icon type="logout" />
                        {' '}Logout
                    </a>
                    :
                    null
                }
            </header>
        );
    }
}