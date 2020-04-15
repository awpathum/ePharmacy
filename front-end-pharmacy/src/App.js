import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import NavBar from "./components/navBar";
import Suppliers from "./components/suppliers/suppliers";
import Drugs from "./components/drugs";
import Bills from "./components/bills";
import NotFound from "./components/notfound";
import SupplierForm from "./components/suppliers/supplierFrom";
import Stocks from './components/stocks/stocks';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <main className="container">
          <Switch>
            <Route path="/home" component={Home}></Route>
            <Route path="/suppliers/:id" component={SupplierForm}></Route>
            <Route path="/suppliers/new" exact component={SupplierForm}></Route>
            <Route path="/suppliers" component={Suppliers}></Route>
            <Route path="/stocks" component={Stocks}></Route>
            <Route path="/drugs" component={Drugs}></Route>
            <Route path="/bills" component={Bills}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/home"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
