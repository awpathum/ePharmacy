import React, { Component } from 'react';
import { Formik, Field } from 'formik';

class DrugComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 'PK001',
            name: 'ZZZ',
            unitPrice: 10,
            compound: 'Paracetamol',
            stock: 5000
        }
    }

    render() {
        let id = this.state.id
        let name = this.state.name
        let unitPrice = this.unitPrice
        let compound = this.state.compound
        let stock = this.state.stock
        return <div>
            <h1>Drug</h1>
            <div className="container">
                <Formik
                    initialValues={{
                        id,
                        name,
                        unitPrice,
                        compound,
                        stock
                    }}
                >
                    {
                        (props) => (
                            <form>
                                <fieldset className="form-group">
                                    <label>Id</label>
                                    <Field className="form-control" type="text" name="id"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="name"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Unit Price</label>
                                    <Field className="form-control" type="text" name="unitPrice"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Compound</label>
                                    <Field className="form-control" type="text" name="compound"></Field>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Stock</label>
                                    <Field className="form-control" type="text" name="stock"></Field>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </form>
                        )
                    }
                </Formik>

            </div>
        </div>
    }
}
export default DrugComponent