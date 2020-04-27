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
import auth from '../../services/authService';


class Stocks extends Component {

    state = {
        stocks: [],
        suppliers: [],
        currentPage: 1,
        pageSize: 10,
        searchQuery: "",
        selectedSupplier: null,
        sortColumn: { path: 'title', order: 'asc' },
        user: ''

    }

    async componentDidMount() {
        const user = await auth.getCurrentUser().sub;
        console.log(user)
        const { data } = await getSuppliers(user);
        const suppliers = [{ _id: "", name: 'All Suppliers' }, ...data]
        const { data: stocks } = await getStocks(user);
        this.setState({
            stocks,
            suppliers,
            user
        })
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
        console.log(query)
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
                m.drugName.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedSupplier && selectedSupplier.id) {
            filtered = allStocks.filter(m => m.supplier.id === selectedSupplier.id);
        }

        //sorting stocks with lodash
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const stocks = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: stocks, searchQuery }
    }

    getNewStockId = (allStocks) => {
        const { user } = this.state;
        const allStocksLen = allStocks.length;
        let newStockIdStr;
        console.log(allStocksLen)
        if (allStocksLen === 0) {
            newStockIdStr = '1';
        } else {
            console.log('alllStocks', allStocks)
            const lastStockId = allStocks[allStocksLen - 1].id;
            console.log('lastStockId', lastStockId);
            let newStockId = lastStockId.substring(1, lastStockId.length);
            let newStockIdInt = parseInt(newStockId);
            console.log('newStockIdInt', newStockIdInt)
            newStockIdInt++;
            console.log(newStockIdInt.toString());
            newStockIdStr = newStockIdInt.toString();
        }

        console.log(newStockIdStr)


        if (newStockIdStr.length === 1) {
            let prefix = user + "L00000";
            const refactoredStockId = prefix.concat(newStockIdStr);
            console.log('refactoredStockId', refactoredStockId)
            return refactoredStockId;
        } else if (newStockIdStr.length === 2) {
            let prefix = user + "L0000";
            const refactoredStockId = prefix.concat(newStockIdStr);
            return refactoredStockId;
        } else if (newStockIdStr.length === 3) {
            let prefix = user + "L000";
            const refactoredStockId = prefix.concat(newStockIdStr);
            return refactoredStockId;
        } else if (newStockIdStr.length === 4) {
            let prefix = user + "L00";
            const refactoredStockId = prefix.concat(newStockIdStr);
            return refactoredStockId;
        } else if (newStockIdStr.length === 5) {
            let prefix = user + "L0";
            const refactoredStockId = prefix.concat(newStockIdStr);
            return refactoredStockId;
        } else {
            let prefix = user + "L";
            const refactoredStockId = prefix.concat(newStockIdStr);
            return refactoredStockId;
        }

    }

    render() {

        const { length: count } = this.state.stocks;
        const { pageSize, currentPage, stocks: allStocks, selectedSupplier, sortColumn, navBarItems, searchQuery } = this.state;
        const newStockId = this.getNewStockId(allStocks);
        console.log(newStockId)
        if (count === 0) {
            return <div className="container">
                <h1>Stocks</h1>
                <Link
                    to={{ pathname: "/stocks/new", newId: newStockId }}
                    className="btn btn-primary"
                    style={{ marginBottom: 20 }}
                >
                    New Stock
        </Link>
            </div>

        }
        const { totalCount, data: stocks } = this.getPageData();

        return (

            <div className="container">
                <h1>Stocks</h1>
                <Link
                    to={{ pathname: "/stocks/new", newId: newStockId }}
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