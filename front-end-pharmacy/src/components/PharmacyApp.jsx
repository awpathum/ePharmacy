import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LoginComponent from "./LoginComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from './WelcomeComponent';

class PharmacyApp extends Component{
    render(){
        return(
            <div className="PharmacyApp">
                <Router>
                    <>
                    <HeaderComponent></HeaderComponent>
                    <Switch>
                    <Route path="/" exact component={LoginComponent}></Route>
                    <Route path="/login" component={LoginComponent}></Route>
                    <AuthenticatedRoute path="/hello" component={WelcomeComponent}></AuthenticatedRoute>
                    {/* <AuthenticatedRoute path="/todos/:id" component={TodoComponent}></AuthenticatedRoute>
                    <AuthenticatedRoute path="/todos" component={ListTodosComponent}></AuthenticatedRoute>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}></AuthenticatedRoute> */}

                    </Switch>
                    <FooterComponent></FooterComponent>

                    </>

                </Router>


            </div>
        )
    }
}

export default PharmacyApp;