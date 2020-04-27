import React, { Component } from 'react';
import { Formik, Form, Field, } from 'formik';
import { getBill } from '../../services/billService';
import { getDrugs } from '../../services/drugService';
import TableHeader from '../common/tableHeader';
import auth from '../../services/authService';
class BillDetails extends Component {
    state = {
        data: {
            id: "",
            date: "",
            customerName: "",
            customerAge: "",
            totalPrice: 0,
            drugBills: []
        },
        drugs: [],
        user:''
    }

    async populateBill(user) {
        const billId = this.props.match.params.id;
        try {
            const { data: bill } = await getBill(billId);
            console.log('data', bill)

            this.setState({
                data: this.mapToViewModel(bill)
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }

    }

    async populateDrugs(user) {

        try {
            const { data: drugs } = await getDrugs(user);
            console.log('drugs', drugs);
            this.setState({ drugs });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }


    async componentDidMount() {
        const user = auth.getCurrentUser().sub;
        await this.populateBill(user);
        await this.populateDrugs(user);
    }

    mapToViewModel(bill) {
        return {
            id: bill.id,
            date: bill.date,
            customerName: bill.customerName,
            customerAge: bill.customerAge,
            totalPrice: bill.totalPrice,
            drugBills: bill.drugBills
        };
    }

    render() {
        const { data, drugs } = this.state;
        console.log(data)
        console.log(drugs)
        console.log('drugBills', data.drugBills)
        return (
            <div className="container">
                <Formik
                    enableReinitialize
                    initialValues={{
                        id: data.id,
                        date: data.date,
                        customerName: data.customerName,
                        customerAge: data.customerAge,
                        totalPrice: data.totalPrice
                    }}
                >
                    {
                        (props) => (
                            <div className="container m-5">
                                <Form>
                                    <fieldset className="form-group">
                                        <label className="font-weight-bold">Bill Id</label>
                                        <Field className="form-control" type="text" name="id" disabled></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="font-weight-bold">Date</label>
                                        <Field className="form-control" type="date" name="date" disabled></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="font-weight-bold">Total Price</label>
                                        <Field className="form-control" type="text" name="totalPrice" disabled></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="font-weight-bold">Customer Name</label>
                                        <Field className="form-control" type="text" name="customerName" disabled></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label className="font-weight-bold">Customer Age</label>
                                        <Field className="form-control" type="text" name="customerAge" disabled></Field>
                                    </fieldset>
                                    <table className="table">
                                        <thead className="table-primary">
                                            <tr>
                                                <td className="font-weight-bold">Drug Name</td>
                                                <td className="font-weight-bold">Quantity</td>
                                                <td className="font-weight-bold">Net Price</td>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {(drugs.length != 0) ? data.drugBills.map(d =>
                                                <tr className="table-success">
                                                    <td>{drugs.filter(dn => d.id.drugId === dn.id)[0].name}</td>
                                                    <td>{d.quantity}</td>
                                                    <td>{d.netPrice}</td>
                                                </tr>
                                            ) : null
                                            }
                                            <tr className="table-warning">
                                                <td colspan="3"><h2>Total: {data.totalPrice}</h2></td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </Form>
                            </div>
                        )
                    }
                </Formik>
            </div>
        );
    }
}

export default BillDetails;

// { drugs.filter(d => d.id === d.id.drugId) }

// 0