import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HelloWorldService from '../api/HelloWorldService.js'

class WelcomeComponent extends Component {

    constructor(props) {
        super()
        this.state = {
            welcomeMessage : ''
        }
        this.retriveWelcomeMessage = this.retriveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    }

    render() {
        return (
            <>

                <h1>Welcome!</h1>
                <div className="container">
                    Welcome to Pharmacy. To Check the Drug Stock <Link to="home/checkStock">Click Here</Link>
                </div>

                <div className="container">
                    Click here to get welcome message.
                    <br></br>
                    <button on onClick={this.retriveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>

                <div className="container">
                    {this.state. welcomeMessage}
                </div>

            </>
        )


    }

    retriveWelcomeMessage() {
        HelloWorldService.executeHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))
        //.catch()
    }

    handleSuccessfulResponse(response){
        console.log(response)
        
        this.setState({
            welcomeMessage : response.data.greet
        })
        
    }
}
export default WelcomeComponent