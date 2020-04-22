import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
    // return (
    //     <nav className="navbar navbar-expand-lg navbar-light bg-dark">
    //         <Link className="navbar-brand text-white" to="/">Pharmacy</Link>
    //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //             <span className="navbar-toggler-icon"></span>
    //         </button>
    //         <div className="collapse navbar-collapse" id="navbarNav">
    //             <ul className="navbar-nav">

    //                 <li className="nav-item">
    //                     <NavLink className="nav-link text-white" to="/home">Home<span className="sr-only">(current)</span></NavLink>
    //                 </li>
    //                 <li className="nav-item">
    //                     <NavLink className="nav-link text-white" to="/bills">Bills<span className="sr-only">(current)</span></NavLink>
    //                 </li>
    //                 <li className="nav-item">
    //                     <NavLink className="nav-link text-white" to="/drugs">Drugs</NavLink>
    //                 </li>
    //                 <li className="nav-item">
    //                     <NavLink className="nav-link text-white" to="/stocks">Stocks</NavLink>
    //                 </li>
    //                 <li className="nav-item">
    //                     <NavLink className="nav-link text-white" to="/suppliers">Suppliers</NavLink>
    //                 </li>
    //                 {

    //                     !user && (<ul className="navbar-nav navbar-collapse justify-content-end">
    //                         <li className="nav-item">
    //                             <NavLink className="nav-link text-white" to="/login">Login</NavLink>
    //                         </li>
    //                         <li className="nav-item">
    //                             <NavLink className="nav-link text-white" to="/register">Register</NavLink>
    //                         </li>
    //                     </ul>)
    //                 }
    //                 {

    //                     user && (<ul className="navbar-collapse justify-content-end">
    //                         <li className="nav-item">
    //                             <NavLink className="nav-link text-white" to="/logout">Logout</NavLink>
    //                         </li>
    //                     </ul>)
    //                 }
    //             </ul>
    //         </div>
    //     </nav>
    // );
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div> <Link className="navbar-brand text-white" to="/">Pharmacy</Link></div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/home">Home<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/bills">Bills<span className="sr-only">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/drugs">Drugs</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/stocks">Stocks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-white" to="/suppliers">Suppliers</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {

                        !user && (<ul className="navbar-nav navbar-collapse justify-content-end">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/register">Register</NavLink>
                            </li>
                        </ul>)
                    }
                    {

                        user && (<ul className="navbar-collapse justify-content-end">
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" to="/logout">Logout</NavLink>
                            </li>
                        </ul>)
                    }
                </ul>
            </nav>
        </header>
    )
}
export default NavBar;