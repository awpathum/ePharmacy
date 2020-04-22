import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getDrug, saveDrug } from '../../services/drugService';

class DrugForm extends Component {
    state = {
        data: {
            id: "",
            name: "",
            unitPrice: "",
            compound: "",
            quantity: ""
        },
        drugs: [],
        errors: {}
    };

    async populateDrugs() {
        try {
            const drugId = this.props.match.params.id;
            if (drugId === "new") {
                let newDrugs = {
                    id: this.props.location.newId,
                    name: "",
                    unitPrice: "",
                    compound: "",
                    quantity: ""
                }
                this.setState({ data: this.mapToViewModel(newDrugs) });
            } else {
                const { data: drug } = await getDrug(drugId);
                
                this.setState({
                    data: this.mapToViewModel(drug)
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateDrugs();
    }

    mapToViewModel(drug) {
        return {
            id: drug.id,
            name: drug.name,
            unitPrice: drug.unitPrice,
            compound: drug.compound,
            quantity: drug.quantity

        };
    }

    doSubmit = async (values) => {
        delete values.quantity;
        await saveDrug(values);
        this.props.history.push("/drugs");
    };

    validate = (values) => {
        let errors = {};
        if (!values.name) {
            errors.name = "Enter Name";
        }
        if (!values.unitPrice) {
            errors.unitPrice = "Enter Unit Price";
        }
        return errors
    }
    render() {
        const { data, drugs: stateDrugs } = this.state;
        const drugs = [{ id: "", name: "" }, ...stateDrugs]
        return (
            <div className="container">
                <h1>Drug Form</h1>
                <Formik
                    initialValues={{
                        id: data.id,
                        name: data.name,
                        unitPrice: data.unitPrice,
                        compound: data.compound,
                        quantity: data.quantity

                    }}
                    onSubmit={this.doSubmit}
                    validateOnChange={true}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (

                            <Form>
                                <fieldset className="form-group">
                                    <label>Drug Id</label>
                                    <Field className="form-control" type="text" name="id" disabled></Field>
                                </fieldset>
                                <ErrorMessage name="name" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="name" ></Field>
                                </fieldset>
                                <ErrorMessage name="unitPrice" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Unit Price</label>
                                    <Field className="form-control" type="text" name="unitPrice" ></Field>
                                </fieldset>
                                <ErrorMessage name="compound" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Compound</label>
                                    <Field className="form-control" type="text" name="compound" ></Field>
                                </fieldset>
                                <button className="btn btn-primary" type="submit">Save</button>
                            </Form>

                        )}

                </Formik>
            </div>
        )
    }
}

export default DrugForm;