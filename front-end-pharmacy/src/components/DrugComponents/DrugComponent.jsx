import React, { Component } from 'react';
import { Formik, Field,Form,ErrorMessage } from 'formik';
import DrugDataService from '../../api/DrugDataService.js'

class DrugComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: this.props.match.params.name,
            unitPrice: this.props.match.params.unitPrice,
            compound: this.props.match.params.compound,
            stock: 5000
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount(){
        DrugDataService.retrieveDrugById(this.state.id)
                        .then(response => this.setState({
                            name: response.data.name,
                            unitPrice : response.data.unitPrice,
                            compound : response.data.compound,
                            stock : response.data.quantity
                        }))
    }

    onSubmit(values){
        console.log(values)
    }

    validate(values){
        console.log(values)
        let errors = {}
        if(!values.name){
            errors.name = 'Enter a name'
        }
        if(!values.unitPrice){
            errors.unitPrice = 'Enter unit price'
        }
        
        return errors
    }
    render() {
        let name = this.state.name
        let unitPrice = this.state.unitPrice
        let compound = this.state.compound
        let stock = this.state.stock
        return <div>
            <h1>Drug</h1>
            <div className="container">
                <Formik
                    initialValues={{
                        
                        name,
                        unitPrice,
                        compound,
                        stock
                    }}
                    onSubmit = {this.onSubmit}  
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate = {this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="name" Component="div" className="alert alert-warning"></ErrorMessage>
                                <ErrorMessage name="unitPrice" Component="div" className="alert alert-warning"></ErrorMessage>
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
                            </Form>
                        )
                    }
                </Formik>

            </div>
        </div>
    }
}
export default DrugComponent