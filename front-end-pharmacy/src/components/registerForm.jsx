import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import * as userService from '../services/userService';
import auth from '../services/authService'

class RegisterForm extends Form {
    state = {
        data: { username: '', password: '', name: '' },
        errors: {}
    }
    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(5).label('Password'),
        name: Joi.string().required().label('Name'),
    }
    doSubmit = async () => {

        try {
            await userService.register(this.state.data);
            //  auth.loginWithJwt(response.body.data.token);
            this.props.history.push("/register");
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }

    }
    render() {
        return (
            <div className="container-sm w-25">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        {this.renderInput('username', 'Username')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderInput('name', 'Name')}
                    </div>
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;