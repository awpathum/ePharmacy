import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getBill, saveBill, addDrugs } from '../../services/billService';
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
        drugCount: 0,
        netPriceList: [],
        drugIdList: [],
        drugQuantityList: [],
        billSumbit: false,
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
        delete values.totalPrice;
        console.log(values)
        await saveBill(values);
        console.log("doSubmit")
        this.setState({
            billSumbit: true
        })

        //this.props.history.push("/bills");
    };

    // [

    //     {
    //     "drugId": "D000002",
    //   "billId": "B000001",
    //     "quantity" : 50
    //     }
    // ]
    doSubmitDrugs = async () => {
        console.log(this.state.drugList[0])
        let toSumbit = [];
        for (let i = 0; i < this.state.drugList.length; i++) {
            const obj = {}

            obj.billId = this.state.data.id;
            obj.durgId = this.state.drugIdList[i];
            obj.quantity = this.state.drugQuantityList[i];
            toSumbit.push(obj);
        }

        console.log(toSumbit);

        await addDrugs(toSumbit);


        // drugList.map(d => {
        //     obj.drugId = d.
        // })


        console.log("doSubmitDrugs")
    }

    validate = (values) => {
        let errors = {};
        console.log(values)
        if (!values.date) {
            errors.date = "Set Date";
        }
        console.log(errors)
        return errors
    }

    handleNetPrice = (netPrice, comId) => {
        this.state.netPriceList[comId] = netPrice;
        let newTotal = this.state.netPriceList.reduce((partial_sum, a) => partial_sum + a, 0);
        this.setState({
            totalPrice: newTotal,
        })
    }

    handleDrugList = () => {

        this.setState({
            drugList: [...this.state.drugList, <DrugList getNetPrice={this.handleNetPrice} id={this.state.drugList.length} getQuantity={this.handleQuantity} getDrugId={this.handleDrugId}></DrugList>]
        })
    }
    handleQuantity = (quantity) => {
        console.log('quantity', quantity)
        let dq = this.state.drugQuantityList;
        dq.push(quantity)
        this.setState({
            drugQuantityList: dq
        })
        this.state.drugQuantityList.push(quantity)
    }

    handleDrugId = (drugId) => {
        console.log(drugId)
        this.state.drugIdList.push(drugId)
    }

    render() {
        const { data, bills: stateBills } = this.state;
        const bills = [{ id: "", name: "" }, ...stateBills]
        console.log(bills)
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
                                <button className="btn btn-primary" type="submit" disabled={((this.state.totalPrice && this.state.billSumbit) ? false : true)} onClick={this.doSubmitDrugs}>Save</button>

                            </div>






                        </div>

                    </div>



                </div>
            </div >
        )
    }
}

export default BillForm;