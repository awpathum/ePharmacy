import React from 'react';
import { Component } from "react";
import DrugDataService from '../../api/DrugDataService.js'
import AuthenticationService from '../AuthenticationService.js';

class ListDrugsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drugs: [],
            message: null
        }
        this.deleteDrugClicked = this.deleteDrugClicked.bind(this)
        this.refreshDrugs = this.refreshDrugs.bind(this)
        this.updateDrugClicked = this.updateDrugClicked.bind(this)
        this.addTodoClicked = this.adlsdTodoClicked.bind(this)
        
    }

    componentDidMount() {
        this.refreshDrugs()
    }

    shouldComponentUpdate(nextProps,nextState){
        return true
    }

    refreshDrugs() {
        DrugDataService.retrieveAllDrugs()
            .then(response => {
                // console.log(response.data)
                this.setState({ drugs: response.data })
            }
            )
    }

    render() {
        return (
            <div>
                <h1>Drugs</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Unit Price</th>
                                <th>Compound</th>
                                <th>Stock</th>
                                {/* <th>Delete</th> */}
                                <th>Update</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.drugs.map(
                                    drug =>
                                        <tr key={drug.id}>
                                            <td>{drug.id}</td>
                                            <td>{drug.name}</td>
                                            <td>{drug.unitPrice}</td>
                                            <td>{drug.compound}</td>
                                            <td>{drug.quantity}</td>
                                            {/* <td><button className="btn btn-warning" onClick={() => this.deleteDrugClicked(drug.id)}>Delete</button></td> */}
                                            <td><button className="btn btn-success" onClick={() => this.updateDrugClicked(drug.id)}>Update</button></td>
                                        </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    deleteDrugClicked(id) {
        console.log(`${id}`)
        DrugDataService.deleteDrug(id)
            .then(
                response => {
                    this.setState({
                        message: `Delte of drug ${id}`
                    });
                    this.refreshDrugs();
                }
            )
    }

    updateDrugClicked(id) {
        console.log(`${id}`)
        this.props.history.push(`/drug/${id}`)
        
    }

    addTodoClicked(){
        this.props.history.push('/newdrug')
    }

}
export default ListDrugsComponent