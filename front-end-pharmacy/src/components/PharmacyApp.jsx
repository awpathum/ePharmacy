import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LoginComponent from './LoginComponent.jsx'
import ListDrugsComponent from './DrugComponents/ListDrugsComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import ErrorComponent from './ErrorComponent'
import DrugComponent from './DrugComponents/DrugComponent.jsx'
import AddNewDrugComponent from './DrugComponents/AddNewDrugComponent.jsx'

class PharmacyApp extends Component {

    render() {
        return (
            <div className="PharmacyApp">
                <Router>
                    <>
                        <HeaderComponent></HeaderComponent>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}></Route>
                            <Route path="/authenticate" component={LoginComponent}></Route>
                            <AuthenticatedRoute path="/drug/:id" exact component={DrugComponent}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/drug/" component={ListDrugsComponent}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/newdrug/" component={AddNewDrugComponent}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/home" exact component={WelcomeComponent}></AuthenticatedRoute>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}></AuthenticatedRoute>
                            <Route path="" component={ErrorComponent}></Route>
                        </Switch>
                        <FooterComponent></FooterComponent>

                    </>
                </Router>

                {/* <LoginComponent></LoginComponent>
            <WelcomeComponent></WelcomeComponent> */}

            </div>
        )
    }
}
export default PharmacyApp;

