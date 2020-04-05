import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom'
//import HelloWorldService from '../../api/todo/HelloWorldService.js'



class WelcomeComponent extends Component {
    // constructor(props) {
    //     super(props)
    //     this.retriveWelcomeMessage = this.retriveWelcomeMessage.bind(this)
    //     this.state = {
    //         welcomeMessage: ''
    //     }
    //     this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
    // }
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    {/* <button onClick={this.retriveWelcomeMessage} className="btn btn-success">Get Welcome Message</button> */}
                    <button className="btn btn-success">Get Welcome Message</button>
                </div>

                <div className="container">
                    {/* {this.state.welcomeMessage} */}
                </div>
            </>
        )
    }
    retriveWelcomeMessage() {
        // HelloWorldService.executeHelloWorldService().then(response => this.handleSuccessfulResponse(response))

        //HelloWorldService.executeHelloWorldBeanService().then(response => this.handleSuccessfulResponse(response))
        HelloWorldService.executeHelloWorldPathVariableService()
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error))
    }


    // handleSuccessfulResponse(response) {
    //     console.log(response)
    //     this.setState({ welcomeMessage: response.data.message })
    // }

    // handleError(error) {
    //     console.log(error)
    //     let errorMessage = ''
    //     if (error.message) {
    //         errorMessage += error.message
    //     }
    //     if (error.response && error.response.data) {
    //         errorMessage += error.message
    //     }

    //     this.setState({ welcomeMessage: errorMessage })
    // }
}
export default WelcomeComponent