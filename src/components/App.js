import React, { Component } from 'react';
import '../styles/App.css';
import { Header } from './Header';
import { Main } from './Main';
import { TOKEN_KEY } from "../constants"

class App extends Component {
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY))
    };

    handleLoginSuccess = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({isLoggedIn: true});
    };

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn: false});
    };

    render() {
        return (
            <div className="App">
                <Header handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} />
                <Main handleLoginSuccess={this.handleLoginSuccess} isLoggedIn={this.state.isLoggedIn} />
            </div>
        );
    }
}

export default App;
