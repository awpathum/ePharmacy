import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getDrug, saveDrug } from '../../services/drugService';
import auth from '../../services/authService';

class DrugForm extends Component {
    state = {
        data: {
            id: "",
            name: "",
            unitPrice: "",
            compound: "",
            quantity: "",
            warningLevel: ""
        },
        drugs: [],
        errors: {},
        user:''
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
                    quantity: "",
                    warningLevel: ""
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
        const user = auth.getCurrentUser().sub;
        await this.populateDrugs(user);
        this.setState({user})
    }

    mapToViewModel(drug) {
        return {
            id: drug.id,
            name: drug.name,
            unitPrice: drug.unitPrice,
            compound: drug.compound,
            quantity: drug.quantity,
            warningLevel: drug.warningLevel

        };
    }

    doSubmit = async (values) => {
        const {user} = this.state;
        delete values.quantity;
        values.id = user + values.id;
        console.log(values)
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
    getId = (id) => {
        let pos = id.indexOf("D");
        let newId = id.substring(pos, id.length);
        return newId;
    }
    render() {
        const { data, drugs: stateDrugs } = this.state;
        const drugs = [{ id: "", name: "" }, ...stateDrugs]
        const id = this.getId(data.id);
        return (
            <div className="container">
                <h1>Drug Form</h1>
                <Formik
                    initialValues={{
                        id,
                        name: data.name,
                        unitPrice: data.unitPrice,
                        compound: data.compound,
                        quantity: data.quantity,
                        warningLevel: data.warningLevel

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
                                <ErrorMessage name="warningLevel" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Warning Level</label>
                                    <Field className="form-control" type="text" name="warningLevel" ></Field>
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