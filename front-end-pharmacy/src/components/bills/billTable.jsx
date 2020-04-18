import React, { Component } from 'react';
import Table from '../common/table';
import { Link } from 'react-router-dom';

class BillsTable extends Component {

    columns = [
        { path: 'id', label: 'Bill Id', content: bill => <Link to={`/bills/${bill.id}`}>{bill.id}</Link> },
        // { path: 'genre.name', label: 'Genre' },
        { path: 'date', label: 'Date' },
        { path: 'customerName', label: 'Name' },
        { path: 'customerAge', label: 'Age' },
        { path: 'totalPrice', label: 'Total Price' },
        //{ path: 'drugBills', label: 'Drugs', content: bill => <Link to={`/bills/${bill.billId}`}>{bill.bill}</Link> },
        // {
        //     key: 'delete',
        //     content: bill => (<button className="btn btn-danger" onClick={() => this.props.onDelete(bill)}disabled={bill.stocks.length ? true : false}>{console.log(bill)}Delete</button>)
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
        const { bills, sortColumn, onSort } = this.props;
        console.log(bills)

        return (
            <Table
                columns={this.columns}
                data={bills}
                sortColumn={sortColumn}
                onSort={onSort}>
            </Table>
        );
    }
}
export default BillsTable;