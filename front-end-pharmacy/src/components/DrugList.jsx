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
        netPrice:'',
        componentId:0
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
        let{id,value} = e.target;
        console.log('value',value,id)
        console.log("this.props.id",this.props.id)
        const netPrice = this.calcutaleNetPrice(value);
        this.props.getNetPrice(netPrice,this.props.id);
        this,this.props.getQuantity(value)
        this.setState({netPrice,componentId:this.props.id})

    }


    calcutaleNetPrice = (quantity) =>{
        const netPrice = quantity * this.state.unitPrice;
        //this.props.netPrice = netPrice;
        return netPrice;
    }

    handleSelectChange = (e) => {
        let { name, value } = e.target;
        console.log(value)
        this.props.getDrugId(value)
        const unitPrice = this.getSelectedDrug(value);
        console.log(unitPrice)
        this.setState({unitPrice})

    }

    getSelectedDrug = (selectedDrugId) => {
        console.log(selectedDrugId)
        console.log(this.state.drugs)
        const drug = this.state.drugs.filter(d => d.id === selectedDrugId)
        console.log(drug)
        this.props.getDrugId(drug[0].id)
        return (drug[0].unitPrice)
        // return drug;
    }

    render() {
        console.log(this.props.netPrice)
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
                            Quantity : {<input type="text" id={this.props.id + 1} className="form-control" onBlur={this.handleTextChange}></input>}
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
