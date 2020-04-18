import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getBill, saveBill } from '../../services/billService';
import DrugList from '../DrugList';

class BillForm extends Component {
    state = {
        data: {
            id: "",
            date: "",
            customerName: "",
            customerAge: "",
            drugBills: [],
        },
        totalPrice: 0,
        bills: [],
        drugList: [],
        errors: {}
    };

    async populateBills() {
        try {
            const billId = this.props.match.params.id;
            if (billId === "new") {
                let newBills = {
                    id: this.props.location.newId,
                    date: "",
                    totalPrice: "",
                    customerName: "",
                    customerAge: "",
                    drugBills: []
                }
                this.setState({ data: this.mapToViewModel(newBills) });
            } else {
                const { data: bill } = await getBill(billId);
                console.log(bill)
                this.setState({
                    data: this.mapToViewModel(bill)
                });
                console.log(this.state.data)
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateBills();
    }

    mapToViewModel(bill) {
        console.log(bill.billName)
        return {
            id: bill.id,
            date: bill.date,
            totalPrice: bill.totalPrice,
            customerName: bill.customerName,
            customerAge: bill.customerAge,
            drugBills: bill.drugBills

        };
    }

    doSubmit = async (values) => {
        console.log(values)
        delete values.quantity;
        console.log(values)
        // await saveBill(values);
        console.log("doSubmit")
        // this.props.history.push("/bills");
    };

    doSubmitDrugs = async (values) => {
        console.log('doSumbitDrugs', values);
        console.log(this.state.drugList[0].props.netPrice)
    }

    validate = (values) => {
        let errors = {};
        console.log(values)
        if (!values.date) {
            errors.date = "Set Date";
        }
        if (!values.totalPrice) {
            errors.totalPrice = "Total Price";
        }
        console.log(errors)
        return errors
    }
    handleNetPrice = (netPrice,name) => {
        console.log(netPrice,name)
        //dont add every time. even when netprice is 0, substract when it's 0.
        let newTotal = this.state.totalPrice + netPrice;
        if (netPrice === 0) {
            newTotal = newTotal - netPrice;
        }

        console.log('newTotal', newTotal)
        this.setState({
            totalPrice: newTotal
        });
        // this.setState({
        //     totalPrice: (totalPrice + netPrice)
        // })
    }

    handleDrugList = () => {
        this.setState({
            drugList: [...this.state.drugList, <DrugList getNetPrice={this.handleNetPrice}></DrugList>]
        })
    }
    render() {
        const { data, bills: stateBills } = this.state;
        const bills = [{ id: "", name: "" }, ...stateBills]
        console.log(bills)
        return (
            <div className="container">
                <h1>Bill Form</h1>
                <div className="row">
                    <div className="col-sm">
                        <Formik
                            initialValues={{
                                id: data.id,
                                date: data.date,
                                totalPrice: data.totalPrice,
                                customerName: data.customerName,
                                customerAge: data.customerAge,

                            }}
                            onSubmit={this.doSubmit}
                            // validateOnChange={true}
                            // validateOnBlur={false}
                            // validate={this.validate}
                            enableReinitialize={true}
                        >
                            {
                                (props) => (

                                    <Form>
                                        <fieldset className="form-group">
                                            <label>Bill Id</label>
                                            <Field className="form-control" type="text" name="id" disabled></Field>
                                        </fieldset>
                                        <ErrorMessage name="date" component="div" className="alert alert-warning"></ErrorMessage>
                                        <fieldset className="form-group">
                                            <label>Date</label>
                                            <Field className="form-control" type="date" name="date" ></Field>
                                        </fieldset>
                                        <ErrorMessage name="totalPrice" component="div" className="alert alert-warning"></ErrorMessage>
                                        <fieldset className="form-group">
                                            <label>Total Price</label>
                                            <Field className="form-control" type="text" name="totalPrice" ></Field>
                                        </fieldset>
                                        <ErrorMessage name="customerName" component="div" className="alert alert-warning"></ErrorMessage>
                                        <fieldset className="form-group">
                                            <label>Customer Name</label>
                                            <Field className="form-control" type="text" name="customerName" ></Field>
                                        </fieldset>
                                        <ErrorMessage name="customerAge" component="div" className="alert alert-warning"></ErrorMessage>
                                        <fieldset className="form-group">
                                            <label>Customer Age</label>
                                            <Field className="form-control" type="text" name="customerAge" ></Field>
                                        </fieldset>

                                        <button className="btn btn-primary" type="submit">Save</button>
                                    </Form>

                                )}

                        </Formik>
                    </div>
                    <div className="col-sm">
                        <div>
                            <Formik
                                onSubmit={this.doSubmitDrugs}

                            >
                                <div>
                                    <button onClick={this.handleDrugList} className="btn btn-success"> + </button>
                                    <Form>
                                        <label>Add Drug</label> <br></br>
                                        <div>
                                            {this.state.drugList}

                                        </div>
                                        <div>{this.state.totalPrice}</div>
                                        <button className="btn btn-primary" type="submit">Save</button>
                                    </Form>
                                </div>
                            </Formik>
                        </div>

                    </div>


                </div>
            </div>
        )
    }
}

export default BillForm;