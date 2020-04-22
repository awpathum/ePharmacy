import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';

class LoginForm extends Form {

    state = {
        data: { username: '', password: '' },
        errors: {},
        didSubmit: false
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    }
    doSubmit = async () => {
        this.setState({
            didSubmit: true
        })

        try {
            const { data } = this.state;
            console.log(data.password);
            // const { data: jwt } = await login(data.username, data.password);
            //console.log('jwt',jwt.token)
            // localStorage.setItem('token', jwt.token);
            // this.props.history.push("/");
            await auth.login(data.username, data.password);
            window.location = '/'; //to update navbar view. to refresh all window
        } catch (ex) {

            //s console.log('ex',ex);
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
                <h1>Login</h1>
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>

                    <div className="form-group">
                        {this.renderInput('username', 'Username')}
                        {this.renderInput('password', 'Password', 'password')}
                        {(this.state.didSubmit) ? console.log("render", this.state.errors) : null}
                    </div>
                    {this.renderButton("Login")}
                </form>

            </div>
        );
    }
}

export default LoginForm;