import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getDrugs } from '../services/drugService';


class DrugList extends Component {
    state = {
        drugs: [],
        selectedDrugId: '',
        selectedDrug: '',
        quantity: '',
        unitPrice: '',
        netPrice: '',
        componentId: 0,
        tmpQuantity: 0
    }
    async populateDrugs() {
        const { data: drugs } = await getDrugs();

        console.log(drugs)
        this.setState({ drugs });
    }
    async componentDidMount() {
        await this.populateDrugs();
        const componentId = this.props.id;
        this.setState(componentId)
    }

    // handleSelect = ({currentTarget:input}) => {
    //     console.log('handleSelect')
    //     console.log(input)
    // }
    handleTextChange = (e) => {
        let { id, value } = e.target;
        console.log('value', value)
        console.log('id', id)
        //this.setState({ tmpQuantity });
        this.state.tmpQuantity = value;
        console.log(this.state.tmpQuantity)

        const netPrice = this.calcutaleNetPrice();
        this.props.getNetPrice(netPrice, this.props.id);
        this.props.getQuantity(value, id);
        this.setState({ netPrice })
    }


    calcutaleNetPrice = () => {
        console.log(this.state.tmpQuantity);
        console.log(this.state.unitPrice);
        const netPrice = this.state.tmpQuantity * this.state.unitPrice;
        //this.props.netPrice = netPrice;
        return netPrice;
    }

    handleSelectChange = (e) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        let { id, value } = e.target;
        console.log('id', id)
        this.props.getDrugId(value)
        const unitPrice = this.getSelectedDrug(value, id);
        console.log(unitPrice)
        this.state.unitPrice = unitPrice;
        this.state.componentId = id;
        //this.setState({ unitPrice, componentId: id })
        this.props.getDrugId(this.setState)


        const netPrice = this.calcutaleNetPrice();
        this.props.getNetPrice(netPrice, this.props.id);
        this.setState({ netPrice });

    }

    getSelectedDrug = (selectedDrugId, comId) => {
        console.log(selectedDrugId)
        console.log(this.state.drugs)
        const drug = this.state.drugs.filter(d => d.id === selectedDrugId)
        console.log('drugId', this.props.getDrugId(drug[0].id, comId))
        this.props.getDrugId(drug[0].id, comId)
        return (drug[0].unitPrice)
        // return drug;
    }

    render() {
        console.log(this.props.netPrice)
        const { drugs: stateDrugs, selectedDrug } = this.state;
        const drugs = [{ id: "", name: "" }, ...stateDrugs];
        return (
            <div>
                <br></br>
                <br></br>
                <div className="container">
                    <div className="row">

                        <div className="col-sm">
                            <select className="btn btn-primary dropdown-toggle" name="drug" id={this.props.id} onChange={this.handleSelectChange}>
                                {drugs.map(d => <option value={d.id} key={d.id}>{d.name}</option>)}
                            </select>
                        </div>
                        <div class="col-sm">
                            Quantity : {<input type="text" className="form-control" id={this.props.id} onBlur={this.handleTextChange}></input>}
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