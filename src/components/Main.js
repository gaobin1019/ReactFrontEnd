import React, { Component } from "react";
import { Register } from "./register"
import { Login } from "./login"

export class Main extends Component {
    render() {
        return (
            <section className="main">
                <Login />
            </section>
        );
    }
}