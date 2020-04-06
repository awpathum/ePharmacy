import React from 'react';
import { Component } from "react";
import { BrowserRouter as  Link } from 'react-router-dom';

class WelcomeComponent extends Component {

    render() {
        return (
            <>

                <h1>Welcome!</h1>
                <div className="container">
                    Welcome to Pharmacy. To Check the Drug Stock <Link to="home/checkStock">Click Here</Link>
                </div>
            </>
        )


    }
}
export default WelcomeComponent