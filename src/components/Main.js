import React, { Component } from "react";
import { WrappedRegister } from "./register"

export class Main extends Component {
    render() {
        return (
            <section className="main">
                <WrappedRegister />
            </section>
        );
    }
}