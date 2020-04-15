import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ items }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Pharmacy</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/home">Home<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/bills">Bills<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/drugs">Drugs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/stocks">Stocks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/suppliers">Suppliers</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default NavBar;