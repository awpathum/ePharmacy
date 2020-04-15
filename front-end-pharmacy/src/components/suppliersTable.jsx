import React, { Component } from 'react';
import Like from "./common/like";
import Table from './common/table';
import { Link } from 'react-router-dom';

class SuppliersTable extends Component {


    columns = [
        { path: 'id', label: 'Supplier Id', content: supplier => <Link to={`/suppliers/${supplier.id}`}>{supplier.id}</Link> },
        { path: 'name', label: 'Name' },
        { path: 'location', label: 'Location' },
        { path: 'email', label: 'Email' },
        { path: 'telephone', label: 'Telephone' },
        // {
        //     key: 'like',
        //     content: supplier => (<Like liked={supplier.liked} onClick={() => this.props.onLike(supplier)}></Like>)
        // },
        {
            key: 'delete',
            content: supplier => (<button className="btn btn-danger" onClick={() => this.props.onDelete(supplier)} disabled={supplier.stocks.length ? true : false} >{console.log(supplier.stocks.length)}Delete</button>)
        },
    ]
    //disabled={supplier.stocks.length ? false:true}

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