import React, { Component } from "react";
// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { getStocks, deleteStock } from "../../services/stockService"
import Pagination from "../common/pagination";
import { paginate } from '../../utils/paginate';
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import { getSuppliers } from "../../services/supplierService";
import StocksTable from "./stocksTable";
import _ from 'lodash';
import { Route, Link } from "react-router-dom";
import { toast } from "react-toastify";


class Stocks extends Component {

    state = {
        stocks: [],
        suppliers: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedSupplier: null,
        sortColumn: { path: 'title', order: 'asc' },
    }

    async componentDidMount() {
        const { data } = await getSuppliers();
        const suppliers = [{ _id: "", name: 'All Suppliers' }, ...data]
        const { data: stocks } = await getStocks();
        console.log(stocks)
        this.setState({
            stocks,
            //suppliers : suppliers, line beloq this is an alternative for this. because key and value are same.
            suppliers
        })
    }

    handleDelete = async (stock) => {  
        const originalStocks = this.state.stocks;
        const stocks = originalStocks.filter(m => m._id !== stock._id);
        this.setState({
            //key and value are same therefore can write like this
            stocks
        });
        try {
            const res = await deleteStock(stock._id);
            console.log(res)
        } catch (ex) {
            console.log(ex)
            if (ex.response && ex.response.status === 404) {
                toast.error('This stock has already been deleted');
            }
            this.setState({
                stocks: originalStocks
            })
        }
    }

    handleLike = (stock) => {
        const stocks = [...this.state.stocks];
        const index = stocks.indexOf(stock);
        stocks[index] = { ...stocks[index] };
        stocks[index].liked = !stocks[index].liked;
        this.setState({
            stocks
        });
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
    handleNewStock = (path) => {
        this.props.history.push(path)
    }
    handleSearch = query => {
        this.setState({
            searchQuery: query,
            selectedSupplier: null,
            currentPage: 1
        })
    }

    getPageData = () => {
        const { pageSize, currentPage, stocks: allStocks, selectedSupplier, sortColumn, searchQuery } = this.state;
        let filtered = allStocks;

        if (searchQuery) {
            filtered = allStocks.filter(m =>
                m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedSupplier && selectedSupplier._id) {
            filtered = allStocks.filter(m => m.supplier._id === selectedSupplier._id);
        }

        //sorting stocks with lodash
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const stocks = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: stocks, searchQuery }
    }


    render() {
        const { length: count } = this.state.stocks;
        const { pageSize, currentPage, stocks: allStocks, selectedSupplier, sortColumn, navBarItems, searchQuery } = this.state;
        if (count === 0) {
            return <p>There are no stocks in the database.</p>
        }
        const { totalCount, data: stocks } = this.getPageData();
        console.log(stocks)
        return (

                <div className="container">
                    <Link
                        to="/stocks/new"
                        className="btn btn-primary"
                        style={{ marginBottom: 20 }}
                    >
                        New Stock
                    </Link>
                    <p>Showing {totalCount} stocks in the database.</p>
                    <SearchBox
                        value={searchQuery} onChange={this.handleSearch}></SearchBox>
                    <StocksTable
                        stocks={stocks}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.hanldeSort}
                    ></StocksTable>
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

export default Stocks;