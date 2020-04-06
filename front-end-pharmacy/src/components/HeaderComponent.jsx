import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js'
class HeaderComponent extends Component {
    render() {

        const  isUserLoggerIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggerIn)
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://localhost:3000/home" className="navbar-brand">Pharmacy</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggerIn && <li><Link className="nav-link" to="/home">Home</Link></li>}
                        {isUserLoggerIn && <li><Link className="nav-link" to="/drug/">Drugs</Link></li>}
                        {isUserLoggerIn && <li><Link className="nav-link" to="/stock/">Stocks</Link></li>}
                        {isUserLoggerIn && <li><Link className="nav-link" to="/supplier/">Sppliers</Link></li>}
                        {isUserLoggerIn && <li><Link className="nav-link" to="/bill/">Bills</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggerIn && <li><Link className="nav-link" to="/authenticate">Login</Link></li>}
                        {isUserLoggerIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>

                </nav>

            </header>
        )
    }
}
export default HeaderComponent