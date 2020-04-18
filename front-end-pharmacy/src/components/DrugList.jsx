import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getDrugs } from '../services/drugService';


class DrugList extends Component {
    state = {
        drugs: [],
        selectedDrugId: '',
        selectedDrug: '',
        quantity: '',
        unitPrice:'',
        netPrice:''

    }
    async populateDrugs() {
        const { data: drugs } = await getDrugs();

        console.log(drugs)
        this.setState({ drugs });
    }
    async componentDidMount() {
        await this.populateDrugs();
    }

    // handleSelect = ({currentTarget:input}) => {
    //     console.log('handleSelect')
    //     console.log(input)
    // }
    handleTextChange = (e) => {
        let{name,value} = e.target;
        const netPrice = this.calcutaleNetPrice(value);
        this.setState({netPrice})

    }

    calcutaleNetPrice = (quantity) =>{
        const netPrice = quantity * this.state.unitPrice;
        return netPrice;
    }

    handleSelectChange = (e) => {
        let { name, value } = e.target;
        console.log(value)
        const unitPrice = this.getSelectedDrug(value);
        console.log(unitPrice)
        this.setState({unitPrice})

    }

    getSelectedDrug = (selectedDrugId) => {
        console.log(selectedDrugId)
        console.log(this.state.drugs)
        const drug = this.state.drugs.filter(d => d.id === selectedDrugId)
        console.log(drug)
        return (drug[0].unitPrice)
        // return drug;
    }

    render() {
        const { drugs : stateDrugs, selectedDrug } = this.state;
        const drugs = [{ id: "", name: "" }, ...stateDrugs];
        return (
            // <p>hello</p>
            <div>
                <br></br>
                <br></br>
                <div className="container">
                    <div className="row">

                        <div className="col-sm">
                            <select className="btn btn-primary dropdown-toggle" name="drug" onChange={this.handleSelectChange}>
                                {drugs.map(d => <option value={d.id} key={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                        <div class="col-sm">
                            Quantity : {<input type="text" name="quantity" className="form-control" onChange={this.handleTextChange}></input>}
                        </div>
                        <div class="col-sm">

                            Unit Price : {this.state.unitPrice}
                        </div>
                        <div class="col-sm">
                            Net Price : {this.state.netPrice}
                        </div>

                    </div>

                </div>


                <br></br>

            </div>
        );
    }
}
export default DrugList;
