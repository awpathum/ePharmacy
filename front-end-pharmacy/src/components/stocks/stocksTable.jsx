import React, { Component } from 'react';
import Table from '../common/table';
import { Link } from 'react-router-dom';

class StocksTable extends Component {

    columns = [
        { path: 'id', label: 'Stock Id', content: stock => <Link to={`/stocks/${stock.id}`}>{stock.id}</Link> },
        // { path: 'genre.name', label: 'Genre' },
        { path: 'drugName', label: 'Drug' },
        { path: 'quantity', label: 'Quantity' },
        { path: 'manDate', label: 'Man Date' },
        { path: 'resDate', label: 'Res Date' },
        { path: 'expDate', label: 'Exp Date' },
        { path: 'supplier', label: 'Supplier', content: stock => <Link to={`/suppliers/${stock.supplierId}`}>{stock.supplier}</Link> },
        // {
        //     key: 'delete',
        //     content: stock => (<button className="btn btn-danger" onClick={() => this.props.onDelete(stock)}>{console.log(stock)}Delete</button>)
        // },
    ]

    raiseSort = path => {
        const sortColumn = { ...this.props.sortColumn };
        if (sortColumn.path === path) {
            sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
        } else {
            sortColumn.path = path;
            sortColumn.order = "asc";
        }
        this.props.onSort(sortColumn);
    };
    render() {
        const { stocks, sortColumn, onSort } = this.props;
        console.log(stocks)

        return (
            <Table
                columns={this.columns}
                data={stocks}
                sortColumn={sortColumn}
                onSort={onSort}>
            </Table>
        );
    }
}
export default StocksTable;