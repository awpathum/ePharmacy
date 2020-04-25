import React, { Component } from 'react';
import Table from '../common/table';
import { Link } from 'react-router-dom';

class DrugsTable extends Component {

    columns = [
        { path: 'id', label: 'Drug Id', content: drug => <Link to={`/drugs/${drug.id}`}>{drug.id}</Link> },
        // { path: 'genre.name', label: 'Genre' },
        { path: 'name', label: 'Name' },
        { path: 'unitPrice', label: 'Unit Price' },
        { path: 'compound', label: 'Compound' },
        { path: 'quantity', label: 'Stock' },
        { path: 'warningLevel', label: 'Warning Level' },
        // { path: 'drug', label: 'Drug', content: drug => <Link to={`/drugs/${drug.drugId}`}>{drug.drug}</Link> },
        // {
        //     key: 'delete',
        //     content: drug => (<button className="btn btn-danger" onClick={() => this.props.onDelete(drug)}disabled={drug.stocks.length ? true : false}>{console.log(drug)}Delete</button>)
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
        const { drugs, sortColumn, onSort } = this.props;
        console.log(drugs)

        return (
            <Table
                columns={this.columns}
                data={drugs}
                sortColumn={sortColumn}
                onSort={onSort}>
            </Table>
        );
    }
}
export default DrugsTable;