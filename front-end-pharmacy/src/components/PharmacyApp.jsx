import React from 'react';
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

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
                            <Route path="/home/checkStock" component={ListDrugsComponent}></Route>
                            <Route path="/home" exact component={WelcomeComponent}></Route>
                            <Route path="/logout" component={LogoutComponent}></Route>
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

class ListDrugsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drugs: [
                { id: 'PK001', Name: 'Panadol', unitPrice: 10, Compound: 'Paracetamol', Quantity: 5000 },
                { id: 'PK001', Name: 'Panadol', unitPrice: 10, Compound: 'Paracetamol', Quantity: 5000 },

            ]
        }
    }

    render() {
        return (
            <div>
                <h1>General Stock</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Unit Price</th>
                            <th>Compound</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.drugs.map(
                                drug =>
                                    <tr>
                                        <td>{drug.id}</td>
                                        <td>{drug.Name}</td>
                                        <td>{drug.unitPrice}</td>
                                        <td>{drug.Compound}</td>
                                        <td>{drug.Quantity}</td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://localhost:3000/home" className="navbar-brand">Pharmacy</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/home">Home</Link></li>
                        <li><Link className="nav-link" to="/drug/">Drugs</Link></li>
                        <li><Link  className="nav-link" to="/stock/">Stocks</Link></li>
                        <li><Link className="nav-link" to="/supplier/">Sppliers</Link></li>
                        <li><Link className="nav-link" to="/bill/">Bills</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link className="nav-link" to="/authenticate">Login</Link></li>
                        <li><Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>

                </nav>

            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2020 @awpathum</span>

            </footer>
        )
    }
}

class LogoutComponent extends Component{
    render(){
        return(
            <div>
                <h1>You are Logged Out</h1>
                <div className="container">Have a Nice Day</div>
            </div>
        )
    }
}

class WelcomeComponent extends Component {

    render() {
        return <div>Welcome to Pharmacy. To Check the Drug Stock <Link to="home/checkStock">Click Here</Link></div>
    }
}

class ErrorComponent extends Component {
    render() {
        return <div>Invalid URL</div>
    }
}


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
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}
                User Name : <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                Password : <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <br></br>
                <button onClick={this.loginClicked}>Login</button>

            </div>

        )
    }
}






export default PharmacyApp;

