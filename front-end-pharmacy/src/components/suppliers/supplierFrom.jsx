import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getSupplier, saveSupplier } from "../../services/supplierService";
import { getGenres } from "../../services/genreService";

class SupplierForm extends Form {
    state = {
        data: {
            id: "",
            name: "",
            location: "",
            email: "",
            telephone: ""
        },
        errors: {}
    };

    schema = {
        id: Joi.string(),
        name: Joi.string()
            .required()
            .label("Name"),
        location: Joi.string().label("Location"),
        email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
        telephone: Joi.string().required().min(10).max(12).label("Telephone")
    };

    async populateSupplier() {
        try {
            const supplierId = this.props.match.params.id;
            console.log(this.props.location.newId)
            if (supplierId === "new") {

                let newsupplier = {
                    id: this.props.location.newId,
                    name: "",
                    location: "",
                    email: "",
                    telephone: ""
                };

                console.log(newsupplier);

                this.setState({ data: this.mapToViewModel(newsupplier) });
            } else {
                const { data: supplier } = await getSupplier(supplierId);
                this.setState({ data: this.mapToViewModel(supplier) });
            }

        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateSupplier();
    }

    mapToViewModel(supplier) {
        return {
            id: supplier.id,
            name: supplier.name,
            location: supplier.location,
            email: supplier.email,
            telephone: supplier.telephone,
        };
    }

    doSubmit = async () => {
        await saveSupplier(this.state.data);

        this.props.history.push("/suppliers");
    };

    render() {
        return (
            <div>
                <h1>Supplier Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("id", "Supplier Id","text",true)}
                    {this.renderInput("name", "Name")}
                    {this.renderInput("location", "Location")}
                    {this.renderInput("email", "Email")}
                    {this.renderInput("telephone", "Telephone")}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default SupplierForm;