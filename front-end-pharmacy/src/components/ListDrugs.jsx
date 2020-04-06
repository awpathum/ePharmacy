import React from 'react';
import { Component } from "react";

class ListDrugsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drugs: [
                { id: 'PK001', Name: 'Panadol', unitPrice: 10, Compound: 'Paracetamol', Quantity: 5000 },
                { id: 'PK002', Name: 'Panadol', unitPrice: 10, Compound: 'Paracetamol', Quantity: 5000 },

            ]
        }
    }

    render() {
        return (
            <div>
                <h1>General Stock</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Unit Price</th>
                                <th>Compound</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.drugs.map(
                                    drug =>
                                        <tr  key={drug.id}>
                                            <td>{drug.id}</td>
                                            <td>{drug.Name}</td>
                                            <td>{drug.unitPrice}</td>
                                            <td>{drug.Compound}</td>
                                            <td>{drug.Quantity}</td>
                                        </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ListDrugsComponent