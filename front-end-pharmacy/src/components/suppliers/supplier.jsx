import React, { Component } from 'react';
import { getSuppliers, deleteSupplier } from '../../services/supplierService';
import { Route, Link } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from '../../utils/paginate';
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import SupplierTable from './supplierTable';
import { toast } from "react-toastify";
import _ from 'lodash';
import auth from '../../services/authService'

class Suppliers extends Component {
    state = {
        suppliers: [],
        currentPage: 1,
        pageSize: 10,
        searchQuery: "",
        selectedSupplier: null,
        sortColumn: { path: 'title', order: 'asc' },
        user: ''
    }

    async componentDidMount() {
        const user = auth.getCurrentUser().sub;
        const { data } = await getSuppliers(user);
        this.setState({
            user,
            suppliers: data
        })
    }

    handleDelete = async (supplier) => {

        const originalSuppliers = this.state.suppliers;
        const suppliers = originalSuppliers.filter(s => s.id !== supplier.id);
        console.log(supplier)
        this.setState({
            suppliers
        });
        try {
            console.log(supplier)
            const res = await deleteSupplier(supplier.id);
            console.log(supplier.id)
        } catch (ex) {
            console.log(ex)
            if (ex.response && ex.response.status === 404) {
                toast.error('This supplier has already been deleted');
            }
            this.setState({
                suppliers: originalSuppliers
            })
        }
    }
    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
    }

    handleSupplierSelect = (supplier) => {
        this.setState({
            selectedSupplier: supplier,
            searchQuery: "",
            currentPage: 1
        })
    }

    hanldeSort = (sortColumn) => {
        this.setState({
            sortColumn
        })
    }
    handleNewSupplier = (path) => {
        this.props.history.push(path)
    }
    handleSearch = query => {
        console.log(query)
        this.setState({
            searchQuery: query,
            selectedSupplier: null,
            currentPage: 1
        })
    }

    getPageData = () => {
        const { pageSize, currentPage, suppliers: allSuppliers, selectedSupplier, sortColumn, searchQuery } = this.state;
        let filtered = allSuppliers;

        if (searchQuery) {
            filtered = allSuppliers.filter(s =>
                s.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedSupplier && selectedSupplier.id) {
            filtered = allSuppliers.filter(s => s.supplier.id === selectedSupplier.id);
        }

        //sorting suppliers with lodash
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const suppliers = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: suppliers, searchQuery }
    }

    getNewSupplierId = (allSuppliers) => {
        const {user} = this.state;
        const allSuppliersLen = allSuppliers.length;
        let newSupplierIdStr;
        if (allSuppliersLen === 0) {
            newSupplierIdStr = '1';
        } else {
            const lastSupplierId = allSuppliers[allSuppliersLen - 1].id;
            console.log('lastSupplierId', lastSupplierId);
            let pos = lastSupplierId.indexOf("S");
            console.log(pos);
            let newSupplierId = lastSupplierId.substring(pos+1, lastSupplierId.length);
            console.log(newSupplierId)
            let newSupplierIdInt = parseInt(newSupplierId);
            console.log('newSupplierIdInt', newSupplierIdInt)
            newSupplierIdInt++;
            console.log(newSupplierIdInt.toString());
            newSupplierIdStr = newSupplierIdInt.toString();
        }

        console.log(newSupplierIdStr)


        if (newSupplierIdStr.length === 1) {
            let prefix = user + "S00000";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            console.log('refactoredSupplierId', refactoredSupplierId)
            return refactoredSupplierId;
        } else if (newSupplierIdStr.length === 2) {
            let prefix = user + "S0000";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            return refactoredSupplierId;
        } else if (newSupplierIdStr.length === 3) {
            let prefix = user + "S000";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            return refactoredSupplierId;
        } else if (newSupplierIdStr.length === 4) {
            let prefix = user + "S00";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            return refactoredSupplierId;
        } else if (newSupplierIdStr.length === 5) {
            let prefix = user + "S0";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            return refactoredSupplierId;
        } else {
            let prefix = user + "S";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            return refactoredSupplierId;
        }

    }

    render() {
        const { length: count } = this.state.suppliers;
        console.log(this.state.suppliers)
        const { pageSize, currentPage, suppliers: allSuppliers, selectedSupplier, sortColumn, navBarItems, searchQuery } = this.state;
        console.log(allSuppliers)
        const newSupplierId = this.getNewSupplierId(allSuppliers);
        console.log('newSupplierId', newSupplierId);

        if (count === 0) {
            return <div className="container">
                <h1>Suppliers</h1>
                <Link
                    to={{ pathname: "/suppliers/new", newId: newSupplierId }}
                    className="btn btn-primary"
                    style={{ marginBottom: 20 }}
                >
                    New Supplier
        </Link>
            </div>
        }
        const { totalCount, data: suppliers } = this.getPageData();
        return (
            < div className = "container" >
                <h1>Suppliers</h1>
                <Link
                    to={{ pathname: "/suppliers/new", newId: newSupplierId }}
                    className="btn btn-primary"
                    style={{ marginBottom: 20 }}
                >
                    New Supplier
                    </Link>
                <p>Showing {totalCount} suppliers in the database.</p>
                <SearchBox
                    value={searchQuery} onChange={this.handleSearch}></SearchBox>
                <SupplierTable
                    suppliers={suppliers}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.hanldeSort}
                ></SupplierTable>
                <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}>
                </Pagination>

            </div >

        );
    }
}

export default Suppliers;