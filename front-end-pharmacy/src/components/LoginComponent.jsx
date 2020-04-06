import React from 'react';
import { Component } from "react";
import AuthenticationService from './AuthenticationService.js'

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'mamba',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
        //console.log(event.target.value);

        this.setState({
            [event.target.name]: event.target.value
        })

    }

    loginClicked() {
        //mamba
        //mamba123
        if (this.state.username === 'mamba' && this.state.password === 'mamba123') {
            AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
            this.props.history.push("/home")
            // this.setState({ showSuccessMessage: true })
            // this.setState({ hasLoginFailed: false })
        }
        else {
            console.log('failed')
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
        }

        console.log(this.state)
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <br></br>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>

        )
    }
}

export default LoginComponent