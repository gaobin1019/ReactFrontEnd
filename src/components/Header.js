import React, { Component } from 'react';
import logo from '../assets/images/dollars_logo.jpg';
import PropTypes from "prop-types";
import { Icon } from "antd";

export class Header extends Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        handleLogout: PropTypes.func.isRequired
    }

    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
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