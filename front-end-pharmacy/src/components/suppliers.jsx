import React, { Component } from "react";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from '../utils/paginate';
import ListGroup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import SuppliersTable from "./suppliersTable";
import { getSuppliers, deleteSupplier } from "../services/supplierService";
import _ from 'lodash';
import { Route, Link } from "react-router-dom";
import { toast } from "react-toastify";

class Suppliers extends Component {
    state = {
        suppliers: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path: 'supplier', order: 'asc' },
        isdisabled : true
    }

    async componentDidMount() {
        const { data: suppliers } = await getSuppliers();
        console.log(suppliers[0].name);
        this.setState({
            suppliers,
        })
    }

    handleDelete = async (supplier) => {
        const originalSuppliers = this.state.suppliers;
        const suppliers = originalSuppliers.filter(s => s.id !== supplier.id);
        this.setState({
            //key and value are same therefore can write like this
            suppliers
        });
        try {
            const res = await deleteSupplier(supplier.id);
            console.log(res)
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

    handleLike = (supplier) => {
        const suppliers = [...this.state.suppliers];
        const index = suppliers.indexOf(supplier);
        suppliers[index] = { ...suppliers[index] };
        suppliers[index].liked = !suppliers[index].liked;
        this.setState({
            suppliers
        });
    }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
    }

    handleGenreSelect = (genre) => {
        this.setState({
            selectedGenre: genre,
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
        this.setState({
            searchQuery: query,
            selectedGenre: null,
            currentPage: 1
        })
    }

    handleButtonDisable = () => {
        console.log(this.state.suppliers.stocks.length);
        //if(this.state.suppliers.stock)
    }

    getPageData = () => {
        const { pageSize, currentPage, suppliers: allSuppliers, selectedGenre, sortColumn, searchQuery } = this.state;
        let filtered = allSuppliers;

        if (searchQuery) {
            filtered = allSuppliers.filter(s =>
                s.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedGenre && selectedGenre._id) {
            filtered = allSuppliers.filter(s => s.genre._id === selectedGenre._id);
        }

        //sorting suppliers with lodash
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const suppliers = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: suppliers, searchQuery }
    }
    getNewSupplierId = (allSuppliers) => {
        const allSuppliersLen = allSuppliers.length;
        const lastSupplierId = allSuppliers[allSuppliersLen - 1].id;
        console.log(lastSupplierId);
        let newSupplierId = lastSupplierId.substring(1, lastSupplierId.length);
        let newSupplierIdInt = parseInt(newSupplierId);
        newSupplierIdInt++;
        console.log(newSupplierIdInt.toString());
        const newSupplierIdStr = newSupplierIdInt.toString();

        if (newSupplierIdStr.length === 1) {
            let prefix = "S00";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            return refactoredSupplierId;
        } else if (newSupplierIdStr.length === 2) {
            let prefix = "S0";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            return refactoredSupplierId;
        } else {
            let prefix = "S";
            const refactoredSupplierId = prefix.concat(newSupplierIdStr);
            return refactoredSupplierId;
        }

    }

    render() {
        const { length: count } = this.state.suppliers;
        const { pageSize, currentPage, suppliers: allSuppliers, selectedGenre, sortColumn, navBarItems, searchQuery,isdisabled } = this.state;
       // this.handleButtonDisable();
        if (count === 0) {
            return <p>There are no suppliers in the database.</p>
        }
        const { totalCount, data: suppliers } = this.getPageData();
        const newSupplierId = this.getNewSupplierId(allSuppliers);
        //return `${apiEndpoint}/${id}`;
       // const path = "suppliers/" + `${newSupplierId}`;
        return (
            <div className="container">
                <h1>Suppliers</h1>
                <Link
                to = {{pathname:"/suppliers/new",newId : newSupplierId}}
                    className="btn btn-primary"
                    style={{ marginBottom: 20 }    
                }
                >
                    New Supplier
            </Link>
                <p>Showing {totalCount} suppliers in the database.</p>
                <SearchBox
                    value={searchQuery} onChange={this.handleSearch}></SearchBox>
                <SuppliersTable
                    suppliers={suppliers}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.hanldeSort}
                ></SuppliersTable>
                <Pagination
                    itemsCount={totalCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}>
                </Pagination>

            </div>


        );
    }
}

export default Suppliers;