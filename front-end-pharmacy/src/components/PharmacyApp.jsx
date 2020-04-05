import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";

class PharmacyApp extends Component{
    render(){
        return(
            <div className="PharmacyApp">
                <Router>
                    <>
                    <HeaderComponent></HeaderComponent>
                    <FooterComponent></FooterComponent>
                    
                    </>

                </Router>


            </div>
        )
    }
}

export default PharmacyApp;