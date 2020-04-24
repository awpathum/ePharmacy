import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getBill, saveBill, addDrugs } from '../../services/billService';
import DrugList from '../DrugList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class BillForm extends Component {
    state = {
        data: {
            id: "",
            date: "",
            customerName: "",
            customerAge: "",
            drugBills: [],
            totalPrice: 0,
        },

        bills: [],
        drugList: [],
        drugCount: 0,
        netPriceList: [],
        drugIdList: [],
        drugQuantityList: [],
        billSumbit: false,
        errors: {},
        validated: true
    };

    getCurrentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        //resDate 2021-05-23
        today = yyyy + '-' + mm + '-' + dd;
        console.log('today', today)
        //today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    async populateBills() {
        try {
            const billId = this.props.match.params.id;
            if (billId === "new") {
                let newBills = {
                    id: this.props.location.newId,
                    date: this.getCurrentDate(),
                    totalPrice: 0,
                    customerName: "",
                    customerAge: "",
                    drugBills: []
                }
                this.setState({ data: this.mapToViewModel(newBills) });
            } else {
                const { data: bill } = await getBill(billId);

                this.setState({
                    data: this.mapToViewModel(bill)
                });

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
        console.log('bill', bill)
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

        delete values.quantity;
        delete values.totalPrice;

        await saveBill(values);

        this.setState({
            billSumbit: true
        })
        this.notify();
    };
    doSubmitDrugs = async () => {
        let toSumbit = [];
        console.log('drugIdList', this.state.drugIdList)
        for (let i = 0; i < this.state.drugList.length; i++) {
            const obj = {}

            obj.drugId = this.state.drugIdList[i];
            obj.billId = this.state.data.id;
            obj.quantity = parseInt(this.state.drugQuantityList[i]);
            toSumbit.push(obj);
        }
        console.log(this.state.drugQuantityList)
        console.log('toSumbmit', toSumbit)
        await addDrugs(toSumbit);
        this.props.history.push("/bills");
    }

    validate = (values) => {
        let errors = {};
        if (!values.date) {
            errors.date = "Set Date";
        }
        return errors
    }

    handleNetPrice = (netPrice, comId) => {
        this.state.netPriceList[comId] = netPrice;
        let newTotal = this.state.netPriceList.reduce((partial_sum, a) => partial_sum + a, 0);
        this.setState({
            totalPrice: newTotal,
        })
    }

    handleValidate = (validated) => {
        console.log('handle validate')
        this.setState({
            validated
        })
        //  this.state.validated = false;
    }

    handleDrugList = () => {

        this.setState({
            drugList: [...this.state.drugList, <DrugList getNetPrice={this.handleNetPrice} id={this.state.drugList.length} getQuantity={this.handleQuantity} getDrugId={this.handleDrugId} validated={this.handleValidate}></DrugList>]
        })
    }
    handleQuantity = (quantity, comId) => {
        console.log('quantity', quantity)
        console.log('comId', comId)
        //   let dq = this.state.drugQuantityList;
        // dq.push(quantity)
        //dq[comId] = quantity;
        // this.setState({
        //     drugQuantityList: dq
        // })
        //  this.state.drugQuantityList.push(quantity)
        this.state.drugQuantityList[comId] = quantity;
    }

    handleDrugId = (drugId, comId) => {
        console.log("drugId", drugId, 'comID', comId)
        console.log('*********************************************************************************************************')
        if (!this.state.drugIdList.includes(drugId)) {
            console.log("############################")
            //this.state.drugIdList.push(drugId)
            this.state.drugIdList[comId] = drugId;
            //this.state.drugIdList = this.state.drugIdList.filter(i => i != null);   
        }
        console.log('drugIdList push', this.state.drugIdList)
    }

    notify = () => toast("Wow so easy !");

    render() {
        const { data, bills: stateBills } = this.state;
        const bills = [{ id: "", name: "" }, ...stateBills];
        return (
            <div className="container">
                <div className="row">
                    <div class="col-md-8"><h1>Bill Form</h1></div>

                    <div class="col-20 col-md-4"><h1>Total = {this.state.totalPrice}</h1></div>
                </div>
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
                            validate={this.validate}
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


                            <div>
                                <label>Add Drug</label> &nbsp;
                                            <button onClick={this.handleDrugList} className="btn btn-success"> + </button>
                                <div>
                                    {this.state.drugList}
                                </div>
                                <button className="btn btn-primary" type="submit" disabled={((this.state.totalPrice && this.state.billSumbit && this.state.validated) ? false : true)} onClick={this.doSubmitDrugs}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default BillForm;