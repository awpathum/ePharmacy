import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Joi from "joi-browser"
import FormD from "../common/form";
import { getStock, saveStock, addSupplierToStock, addDrugToStock } from "../../services/stockService";
import { getSuppliers } from "../../services/supplierService";
import { getDrugs } from '../../services/drugService';

class StockForm extends FormD {
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

  schema = {
    id: Joi.string(),
    drugName: Joi.string()
      .required()
      .label("Drug Name"),
    quantity: Joi.number()
      .required()
      .min(1)
      .label("Quantity")
  }



  async populateSuppliers() {
    const { data: suppliers } = await getSuppliers();
    // let supNames = [];
    // suppliers.forEach(e => {
    //   console.log(e.name);
    //   supNames.push(e.name);
    //   //supNames.push(e.id)
    // });
    this.setState({ suppliers });
  }
  async populateDrugs() {
    const { data: drugs } = await getDrugs();
    // let supNames = [];
    // suppliers.forEach(e => {
    //   console.log(e.name);
    //   supNames.push(e.name);
    //   //supNames.push(e.id)
    // });
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
        this.setState({ data: this.mapToViewModel(stock) });
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
    return {
      id: stock.id,
      drugName: stock.drugName,
      quantity: stock.quantity,
      manDate: stock.manDate,
      resDate: stock.resDate,
      expDate: stock.expDate,
      supplier: stock.supplier,
      supplierId: stock.supplierId

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
      const response1 = await saveStock(stock);
      await addDrugToStock(stockDrug).then((res) => {
         addSupplierToStock(stockSupplier);
        console.log(res)
      })
      // console.log('response1', response1);
      // console.log('response2', response2);
      // console.log('response3', response3);
    } catch (e) {
      console.log(e);
    }

    // await saveStock(stock).then(async (res) => {
    //   console.log(res)
    //   await Promise.all([addDrugToStock(stockDrug), addSupplierToStock(stockSupplier)]);

    // });





    // saveStock(stock);
    //   await addSupplierToStock(stockSupplier);
    // await addDrugToStock(stockDrug);

    //await addDrugToStock(stockDrug);

    // await saveStock(stock).then((res) => {
    //   addSupplierToStock(stockSupplier).then((res) => {
    //     addDrugToStock(stockDrug);
    //   })
    // });
    console.log("doSubmit")
    this.props.history.push("/stocks");
  };

  validate = (values) => {
    let errors = {};
    //const options = {abortEarly:false};
    console.log(values.drug)
    if (!values.drug) {
      errors.drugName = "Enter a name";
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
      errors.manDate = "Set expire date"
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
      <div>
        <h1>Stock Form</h1>
        <Formik
          initialValues={{
            id: data.id,
            drugName: data.drugName,
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
                <ErrorMessage name="drugName" component="div" className="alert alert-warning"></ErrorMessage>
                {/* <fieldset className="form-group">
                  <label>Drug Name</label>
                  <Field className="form-control" type="text" name="drugName"></Field>
                </fieldset> */}

                <label>Drug Name</label>
                <fieldset className="form-group">
                  <Field component="select" className="form-control" type="suppliers" name="drug">
                    {
                      (data.drugName) ? drugs.map(d => (d.id === data.drugId) ? <option value={data.drugId} selected>{data.drug}{console.log('true')}</option> : <option value={d.id}>{d.name}</option>) :
                        drugs.map(d => <option value={d.id} key={d.id} >{console.log(d.id), d.name}</option>)
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
                    {
                      (data.drugName) ? suppliers.map(s => (s.id === data.supplierId) ? <option value={data.supplierId} selected>{data.supplier}{console.log('true')}</option> : <option value={s.id}>{s.name}</option>) :
                        suppliers.map(s => <option value={s.id} key={s.id} >{console.log(s.id), s.name}</option>)
                    }
                  </Field>
                </fieldset>


                {/* <Field component="select" className="form-control" type="suppliers" name="supplier">
                    {
                      console.log('data.id', data.supplierId),
                      //suppliers.map(s => <option value={data.supplierId} key={s.id} >{console.log('s.id',s.id),data.supplier}</option>)
                      (data.drugName) ? <option value={data.supplierId} key={data.id} selected disabled>{data.supplier}</option> : suppliers.map(s => <option value={s.id} key={s.id} >{s.name}</option>)
                      // (data.drugName) ? suppliers.map(s =>
                      //   (s.id === data.supplierId) ?
                      //     <option value={s.id} key={s.id} selected>{s.name}</option>
                      //     : <option value={s.id} key={s.id}>{s.name}</option>
                      // )
                      //   : suppliers.map(s => <option value={data.drugName} key={s.id} >{console.log('s.id', s.id), s.name}
                      //   </option>)

                      //data.id != null ? suppliers.map(s => <option value={s.id} key={s.id}>{s.name}</option>) : suppliers.filter(s => s.name === data.supplier)
                      //data.id === null ? this.renderSelect("supplierId", "Supplier", suppliers) : this.renderSelect("supplierId", "Supplier", suppliers.filter(s => s === this.state.data.supplier))

                    }
                  </Field> */}

                <button className="btn btn-success" type="submit">Save</button>
              </Form>

            )}

        </Formik>
      </div>
    )
  }
}

export default StockForm;