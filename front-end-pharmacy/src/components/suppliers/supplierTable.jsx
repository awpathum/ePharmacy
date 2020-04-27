import React, { Component } from 'react';
import Table from '../common/table';
import { Link } from 'react-router-dom';

class SuppliersTable extends Component {


    columns = [
        { path: 'id', label: 'Supplier Id', content: supplier => <Link to={`/suppliers/${supplier.id}`}>{this.getId(supplier.id)}</Link> },
        // { path: 'genre.name', label: 'Genre' },
        { path: 'name', label: 'Name' },
        { path: 'location', label: 'Location' },
        { path: 'email', label: 'Email' },
        { path: 'telephone', label: 'Telephone' },
        // { path: 'supplier', label: 'Supplier', content: supplier => <Link to={`/suppliers/${supplier.supplierId}`}>{supplier.supplier}</Link> },
        {
            key: 'delete',
            content: supplier => (<button className="btn btn-danger" onClick={() => this.props.onDelete(supplier)} disabled={supplier.stocks.length ? true : false}>{console.log(supplier)}Delete</button>)
        },
    ]

    getId = (id) => {
        let pos = id.indexOf("S");
        let newId = id.substring(pos, id.length);
        return newId;
    }

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
        const { suppliers, sortColumn, onSort } = this.props;
        console.log(suppliers)

        return (
            <Table
                columns={this.columns}
                data={suppliers}
                sortColumn={sortColumn}
                onSort={onSort}>
            </Table>
        );
    }
}
export default SuppliersTable;