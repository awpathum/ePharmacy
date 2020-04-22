import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getStock, saveStock, addSupplierToStock, addDrugToStock } from "../../services/stockService";
import { getSuppliers } from "../../services/supplierService";
import { getDrugs } from '../../services/drugService';

class StockForm extends Component{
  state = {
    data: {
      id: "",
      drugName: "",
      quantity: 0,
      manDate: "",
      resDate: "",
      expDate: "",
      supplier: "",
      supplierId: "",
      drug: "",
      drugId: ""
    },
    suppliers: [],
    drugs: [],
    errors: {}
  };
  async populateSuppliers() {
    const { data: suppliers } = await getSuppliers();
    this.setState({ suppliers });
  }
  async populateDrugs() {
    const { data: drugs } = await getDrugs();
    console.log(drugs)
    this.setState({ drugs });
  }
  async populateStock() {
    try {
      const stockId = this.props.match.params.id;
      if (stockId === "new") {
        let newStock = {
          id: this.props.location.newId,
          drugName: "",
          quantity: "",
          manDate: "",
          resDate: "",
          expDate: "",
          supplier: "",
          supplierId: ""
        }
        this.setState({ data: this.mapToViewModel(newStock) });
      } else {
        const { data: stock } = await getStock(stockId);
        this.setState({
          data: this.mapToViewModel(stock)
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
    await this.populateStock();
    await this.populateDrugs();
  }

  mapToViewModel(stock) {
    console.log(stock.drugName)
    return {
      id: stock.id,
      drugName: stock.drugName,
      quantity: stock.quantity,
      manDate: stock.manDate,
      resDate: stock.resDate,
      expDate: stock.expDate,
      supplier: stock.supplier,
      supplierId: stock.supplierId,
      drugId : stock.drugId

    };
  }

  doSubmit = async (values) => {
    console.log(values)
    const { id, quantity, manDate, resDate, expDate, supplier, drug } = values;
    let drugName;
    this.state.drugs.forEach(function (d) {
      console.log(d)
      console.log(drug)
      if (d.id === drug) {

        drugName = d.name;
      }
    })

    const stock = { id, drugName, quantity, manDate, resDate, expDate }
    const stockSupplier = { supplierId: supplier, stockId: id }
    const stockDrug = { drugId: drug, stockId: id }
    console.log(stock)
    console.log(stockSupplier)
    console.log(stockDrug)

    try {
      const response = await saveStock(stock);
      console.log(response)
    } catch (e) {
      console.log(e);
    }

    try {
      const response1 = await addSupplierToStock(stockSupplier);
      const response2 = await addDrugToStock(stockDrug);
      console.log(response1)
      console.log(response2)
    } catch (e) {
      console.log(e);
    }
    console.log("doSubmit")
    this.props.history.push("/stocks");
  };

  validate = (values) => {
    let errors = {};
    console.log(values.drug)
    if (!values.drug) {
      errors.drug = "Set Drug";
    }
    if (!values.quantity) {
      errors.quantity = "Enter the quantity";
    }
    if (!values.manDate) {
      errors.manDate = "Set manufactured date"
    }
    if (!values.resDate) {
      errors.resDate = "Set receive date"
    }
    if (!values.expDate) {
      errors.expDate = "Set expire date"
    }
    if (!values.supplier) {
      errors.supplier = "Set supplier"
    }
    console.log(errors)
    return errors
  }
  render() {
    const { data, suppliers: stateSuppliers, drugs: stateDrugs } = this.state;
    const suppliers = [{ id: "", name: "" }, ...stateSuppliers]
    const drugs = [{ id: "", name: "" }, ...stateDrugs];
    console.log(suppliers)


    return (
      <div className="container">
        <h1>Stock Form</h1>
        <Formik
          initialValues={{
            id: data.id,
            drug: data.drugId,
            quantity: data.quantity,
            manDate: data.manDate,
            resDate: data.resDate,
            expDate: data.expDate,
            supplier: data.supplierId
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
                <ErrorMessage name="drug" component="div" className="alert alert-warning"></ErrorMessage>
                {/* <fieldset className="form-group">
                  <label>Drug Name</label>
                  <Field className="form-control" type="text" name="drugName"></Field>
                </fieldset> */}

                <label>Drug Name</label>
                <fieldset className="form-group">
                  <Field component="select" className="form-control" type="drugs" name="drug">
                    {

                    (data.drugName) ? drugs.map(d => (d.id === data.drugId) ? <option value={data.drugId} selected>{data.drugName}{console.log(d.id,data.drugId)}{console.log('true')}</option> : <option value={d.id}>{d.name}{console.log('drugs',drugs),console.log('data.drugId',data.drugId)}</option>) :
                        drugs.map(d => <option value={d.id} key={d.id} >{d.name}</option>)
                    }
                  </Field>
                </fieldset>
                <ErrorMessage name="quantity" component="div" className="alert alert-warning"></ErrorMessage>
                <fieldset className="form-group">
                  <label>Quantity</label>
                  <Field className="form-control" type="text" name="quantity"></Field>
                </fieldset>
                <ErrorMessage name="manDate" component="div" className="alert alert-warning"></ErrorMessage>
                <fieldset className="form-group">
                  <label>Man Date</label>
                  <Field className="form-control" type="date" name="manDate"></Field>
                </fieldset>
                <ErrorMessage name="resDate" component="div" className="alert alert-warning"></ErrorMessage>
                <fieldset className="form-group">
                  <label>Res Date</label>
                  <Field className="form-control" type="date" name="resDate"></Field>
                </fieldset>
                <ErrorMessage name="expDate" component="div" className="alert alert-warning"></ErrorMessage>
                <fieldset className="form-group">
                  <label>Exp Date</label>
                  <Field className="form-control" type="date" name="expDate"></Field>
                </fieldset>


                <ErrorMessage name="supplier" component="div" className="alert alert-warning"></ErrorMessage>

                <label>Supplier</label>
                <fieldset className="form-group">
                  <Field component="select" className="form-control" type="suppliers" name="supplier">
                    <div>{console.log(drugs),
                      console.log(data.drugId)}</div>
                    {
                      (data.drugName) ? suppliers.map(s => (s.id === data.supplierId) ? <option value={data.supplierId} selected>{data.supplier}{console.log('true')}</option> : <option value={s.id}>{s.name}</option>) :
                        suppliers.map(s => <option value={s.id} key={s.id} >{console.log(s.id), s.name}</option>)
                    }
                  </Field>
                </fieldset>
                <button className="btn btn-primary" type="submit">Save</button>
              </Form>

            )}

        </Formik>
      </div>
    )
  }
}

export default StockForm;