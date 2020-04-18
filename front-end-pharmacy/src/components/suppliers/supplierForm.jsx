import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getSupplier, saveSupplier } from '../../services/supplierService';
import { getSuppliers } from "../../services/supplierService";
import { getDrugs } from '../../services/drugService';

class SupplierForm extends Component {
    state = {
        data: {
            id: "",
            name: "",
            location: "",
            email: "",
            telephone: ""
        },
        suppliers: [],
        errors: {}
    };

    async populateSuppliers() {
        try {
            const supplierId = this.props.match.params.id;
            if (supplierId === "new") {
                let newSuppliers = {
                    id: this.props.location.newId,
                    name: "",
                    location: "",
                    email: "",
                    telephone: ""
                }
                this.setState({ data: this.mapToViewModel(newSuppliers) });
            } else {
                const { data: supplier } = await getSupplier(supplierId);
                console.log(supplier)
                this.setState({
                    data: this.mapToViewModel(supplier)
                });
                console.log(this.state.data)
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateSuppliers();
    }

    mapToViewModel(supplier) {
        console.log(supplier.drugName)
        return {
            id: supplier.id,
            name: supplier.name,
            location: supplier.location,
            email: supplier.email,
            telephone: supplier.telephone

        };
    }

    doSubmit = async (values) => {
        console.log(values)
        console.log('do submit')
        await saveSupplier(values);
        console.log("doSubmit")
        this.props.history.push("/suppliers");
    };

    validate = (values) => {
        let errors = {};
        console.log(values)
        if (!values.name) {
            errors.name = "Enter Name";
        }
        if (!values.location) {
            errors.location = "Enter Location";
        }
        if (!values.email) {
            errors.email = "Enter Email Address"
        }
        if (!values.telephone) {
            errors.telephone = "Enter Telephone Number"
        }
        console.log(errors)
        return errors
    }
    render() {
        const { data, suppliers: stateSuppliers } = this.state;
        const suppliers = [{ id: "", name: "" }, ...stateSuppliers]
        console.log(suppliers)
        return (
            <div>
                <h1>Supplier Form</h1>
                <Formik
                    initialValues={{
                        id: data.id,
                        name: data.name,
                        location: data.location,
                        email: data.email,
                        telephone: data.telephone
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
                                    <label>Supplier Id</label>
                                    <Field className="form-control" type="text" name="id" disabled></Field>
                                </fieldset>
                                <ErrorMessage name="name" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="name" ></Field>
                                </fieldset>
                                <ErrorMessage name="location" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Location</label>
                                    <Field className="form-control" type="text" name="location" ></Field>
                                </fieldset>
                                <ErrorMessage name="email" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Email</label>
                                    <Field className="form-control" type="text" name="email" ></Field>
                                </fieldset>
                                <ErrorMessage name="telephone" component="div" className="alert alert-warning"></ErrorMessage>
                                <fieldset className="form-group">
                                    <label>Telephone</label>
                                    <Field className="form-control" type="text" name="telephone" ></Field>
                                </fieldset>

                                <button className="btn btn-primary" type="submit">Save</button>
                            </Form>

                        )}

                </Formik>
            </div>
        )
    }
}

export default SupplierForm;