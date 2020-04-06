import React  from 'react';
import { Component } from "react";

class PharmacyApp extends Component{

    render(){
        return(
            <div className="PharmacyApp">
            <LoginComponent></LoginComponent>
            <WelcomeComponent></WelcomeComponent>

            </div>
        )
    }
}


class WelcomeComponent extends Component{

    render(){
        return <div>Welcome to Pharmacy</div>
    }
}


class LoginComponent extends Component{

    constructor(props){
        super(props)
        this.state ={
            username : 'mamba',
            password : '',
            hasLoginFailed:false,
            showSuccessMessage : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event){
        //console.log(event.target.value);

        this.setState({
            [event.target.name] : event.target.value
        })

    }

    loginClicked(){
        //mamba
        //mamba123
        if(this.state.username === 'mamba' && this.state.password === 'mamba123'){
            console.log('Successful')
            this.setState({showSuccessMessage : true})
            this.setState({hasLoginFailed : false})
        }
        else{
            console.log('failed')
            this.setState({showSuccessMessage :false})
            this.setState({hasLoginFailed:true})
        }

        console.log(this.state)
    }
     
    render(){
        return(
            <div>
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <button onClick = {this.loginClicked}>Login</button>

            </div>

        )
    }
}






export default PharmacyApp;

