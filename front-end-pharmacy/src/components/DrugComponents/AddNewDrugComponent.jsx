import React from 'react';
import { Component } from "react";
import { Formik, Field,Form,ErrorMessage } from 'formik';
import DrugDataService from '../../api/DrugDataService.js'

class AddNewDrugComponent extends Component{

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: this.props.match.params.name,
            unitPrice: this.props.match.params.unitPrice,
            compound: this.props.match.params.compound,
            stock: 5000
        }
        // this.onSubmit = this.onSubmit.bind(this)
        // this.validate = this.validate.bind(this)
    }

    // componentDidMount(){

    // }

    render(){
        let id = this.state.id
        return(
            <>
            <h1>Add New Drug</h1>
            <div className="container">
                <Formik
                    initialValues={{
                        id
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
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>

            </div>
            </>
        )
    }
}
export default AddNewDrugComponent