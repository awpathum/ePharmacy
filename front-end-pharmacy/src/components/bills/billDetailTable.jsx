import React, { Component } from 'react';
import Table from '../common/table';
import { Link } from 'react-router-dom';

class BillDetailTable extends Component {

    columns = [
        // { path: 'id', label: 'Drug Id', content: supplier => <Link to={`/billDetail/${supplier.id}`}>{supplier.id}</Link> },
        // { path: 'genre.name', label: 'Genre' },
        { path: 'name', label: 'Name' },
        { path: 'quantity', label: 'Quantity' },
        { path: 'netPrice', label: 'NetPrice' },
        // { path: 'supplier', label: 'Supplier', content: supplier => <Link to={`/billDetail/${supplier.supplierId}`}>{supplier.supplier}</Link> },
        {
            key: 'delete',
            content: supplier => (<button className="btn btn-danger" onClick={() => this.props.onDelete(supplier)}disabled={supplier.stocks.length ? true : false}>{console.log(supplier)}Delete</button>)
        },
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
        const { billDetail, sortColumn, onSort } = this.props;
        console.log(billDetail)

        return (
            <Table
                columns={this.columns}
                data={billDetail}
                sortColumn={sortColumn}
                onSort={onSort}>
            </Table>
        );
    }
}
export default BillDetailTable;