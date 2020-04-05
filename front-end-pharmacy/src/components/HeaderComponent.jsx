import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService.js'
class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="localhost:3000" className="navbar-brand">Pharmacy</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/todos">Home</Link></li>
                        <li><Link className="nav-link" to="/todos">Stocks</Link></li>
                        <li><Link className="nav-link" to="/todos">Drugs</Link></li>
                        <li><Link className="nav-link" to="/todos">Suppliers</Link></li>
                        <li><Link className="nav-link" to="/todos">Bills</Link></li>
                        {/* {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/mamba">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>} */}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}
export default HeaderComponent