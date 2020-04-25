import React, { Component } from 'react';
import { Formik, Form, Field, } from 'formik';
import { getBill } from '../../services/billService';
import { getDrugs } from '../../services/drugService';
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
        drugs: []
    }

    async populateBill() {
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

    async populateDrugs() {

        try {
            const { data: drugs } = await getDrugs();
            console.log('drugs', drugs);
            this.setState({ drugs });
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }


    async componentDidMount() {
        await this.populateBill();
        await this.populateDrugs();
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
        const { data,drugs } = this.state;
        console.log(data)
        console.log(drugs)
        console.log('drugBills', data.drugBills)
        return (
            <div className='container'>
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
                            <Form>
                                <fieldset className="form-group">
                                    <label>Bill Id</label>
                                    <Field className="form-control" type="text" name="id" disabled></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Date</label>
                                    <Field className="form-control" type="date" name="date" disabled></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Total Price</label>
                                    <Field className="form-control" type="text" name="totalPrice" disabled></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Customer Name</label>
                                    <Field className="form-control" type="text" name="customerName" disabled></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Customer Age</label>
                                    <Field className="form-control" type="text" name="customerAge" disabled></Field>
                                </fieldset>
                        {data.drugBills.map(d => <div class="overflow-auto">{d.id.drugId}&nbsp;&nbsp;&nbsp;{d.quantity}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{d.netPrice}</div>)}

                            </Form>
                        )
                    }
                </Formik>
            </div>
        );
    }
}

export default BillDetails;

// { drugs.filter(d => d.id === d.id.drugId) }