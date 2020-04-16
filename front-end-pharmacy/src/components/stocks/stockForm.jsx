import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { getStock, saveStock } from "../../services/stockService";
import { getSuppliers } from "../../services/supplierService";


class StockForm extends Form {
  state = {
    data: {
      id: "",
      drugName: "",
      quantity: 0,
      manDate: "",
      resDate: "",
      expDate: "",
      supplier: "",
      supplierId: ""
    },
    suppliers: [],
    errors: {}
  };

  schema = {
    id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    supplierId: Joi.string()
      .required()
      .label("Supplier"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  async populateSuppliers() {
    const { data: suppliers } = await getSuppliers();
    let supNames= [];
    suppliers.forEach(e => {
      console.log(e.name);
      supNames.push(e.name);
    });
    this.setState({ suppliers : supNames });
  }
  //   async componentDidMount() {
  //     const { data: suppliers } = await getSuppliers();
  //     console.log(suppliers[0].name);
  //     this.setState({
  //         suppliers,
  //     })
  // }
  async populateStock() {
    try {
      const stockId = this.props.match.params.id;
      if (stockId === "new") return;

      const { data: stock } = await getStock(stockId);
      this.setState({ data: this.mapToViewModel(stock) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateSuppliers();
    await this.populateStock();
  }

  mapToViewModel(stock) {
    return {
      id: stock.id,
      drugName: stock.drugName,
      quantity: stock.quantity,
      manDate: stock.manDate,
      resDate: stock.resDate,
      expDate: stock.expDate,
      supplier: stock.supplier

    };
  }

  doSubmit = async () => {
    await saveStock(this.state.data);

    this.props.history.push("/stocks");
  };

  render() {
    console.log(this.state.suppliers)
    //console.log(this.state.suppliers.filter(s => s.name = this.state.data.supplier.name))
    return (
      <div>
        <h1>Stock Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("id", "Stock Id", "text", true)}
          {this.renderInput("drugName", "Drug Name")}
          {this.renderInput("quantity", "Quantity")}
          {this.renderInput("manDate", "Man Date")}
          {this.renderInput("resDate", "Res Date")}
          {this.renderInput("expDate", "Exp Rate")}
          {
            //this.renderSelect("supplierId", "Supplier", this.state.suppliers)
             this.state.data.id === null ? this.renderSelect("supplierId", "Supplier", this.state.suppliers) : this.renderSelect("supplierId", "Supplier", this.state.suppliers.filter(s => s === this.state.data.supplier))
          };

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default StockForm;