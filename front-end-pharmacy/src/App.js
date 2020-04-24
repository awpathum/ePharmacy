import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import NavBar from "./components/navBar";
import Suppliers from "./components/suppliers/supplier";
import Drugs from "./components/drugs/drugs";
import Bills from "./components/bills/bills";
import BillForm from "./components/bills/billForm";
import NotFound from "./components/notfound";
import SupplierForm from "./components/suppliers/supplierForm";
import Stocks from "./components/stocks/stocks";
import StockForm from "./components/stocks/stockForm";
import DrugForm from "./components/drugs/drugForm";
import Footer from "./components/common/Footer";
import Register from "./components/registerForm";
import Login from "./components/loginForm";
import Logout from "./components/logout";
import auth from './services/authService';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import "./App.css";
import BillDetails from "./components/bills/billDetails";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user})
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user}></NavBar>
        <main className="container-fluid">
          <Switch>
            <AuthenticatedRoute path="/home" component={Home}></AuthenticatedRoute>
            <AuthenticatedRoute path="/suppliers/:id" component={SupplierForm}></AuthenticatedRoute>
            <AuthenticatedRoute path="/suppliers/new" exact component={SupplierForm}></AuthenticatedRoute>
            <AuthenticatedRoute path="/suppliers" component={Suppliers}></AuthenticatedRoute>
            <AuthenticatedRoute path="/stocks/:id" component={StockForm}></AuthenticatedRoute>
            <AuthenticatedRoute path="/stocks/new" exact component={StockForm}></AuthenticatedRoute>
            <AuthenticatedRoute path="/stocks" component={Stocks}></AuthenticatedRoute>
            <AuthenticatedRoute path="/drugs/:id" component={DrugForm}></AuthenticatedRoute>
            <AuthenticatedRoute path="/drugs/new" exact component={DrugForm}></AuthenticatedRoute>
            <AuthenticatedRoute path="/drugs" component={Drugs}></AuthenticatedRoute>
            <AuthenticatedRoute path="/bills/:id" component={BillForm}></AuthenticatedRoute>
            <AuthenticatedRoute path="/bill/:id" component={BillDetails}></AuthenticatedRoute>
            <AuthenticatedRoute path="/bills/new" exact component={BillForm}></AuthenticatedRoute>
            <AuthenticatedRoute path="/bills" component={Bills}></AuthenticatedRoute>
            <Route path="/login" component={Login}></Route>
            <AuthenticatedRoute path="/logout" component={Logout}></AuthenticatedRoute>
            <AuthenticatedRoute path="/register" component={Register}></AuthenticatedRoute>
            <AuthenticatedRoute path="/not-found" component={NotFound}></AuthenticatedRoute>
            <Redirect from="/" exact to="/home"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
        <Footer></Footer>
      </React.Fragment>
    );
  }
}

export default App;
