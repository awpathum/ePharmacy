import React, { Component } from 'react';
import { Route, Redirect} from 'react-router-dom';
//import AuthenticationService from './AuthenticationService.js';
import auth from '../services/authService';

class AuthenticatedRoute extends Component {

    render() {
        if (auth.getCurrentUser()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to="/login" />
        }
    }
}
export default AuthenticatedRoute