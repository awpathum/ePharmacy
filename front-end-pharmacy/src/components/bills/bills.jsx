import React, { Component } from 'react';
import {getBills,deleteBill,addDrugs} from '../../services/billService';
import { Route, Link } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from '../../utils/paginate';
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import BillTable from './billTable'
import { toast } from "react-toastify";
import _ from 'lodash';

class Bills extends Component {
    state = {
        bills: [],
        currentPage: 1,
        pageSize: 10,
        searchQuery: "",
        selectedBill: null,
        sortColumn: { path: 'title', order: 'desc' },
    }

    async componentDidMount() {
        const { data } = await getBills();
        console.log(data)
        this.setState({
            bills : data
        })
    }

    handleDelete = async (bill) => {

        const originalBills = this.state.bills;
        const bills = originalBills.filter(s => s.id !== bill.id);
        console.log(bill)
        this.setState({
            bills
        });
        try {
            console.log(bill)
            const res = await deleteBill(bill.id);
            console.log(bill.id)
        } catch (ex) {
            console.log(ex)
            if (ex.response && ex.response.status === 404) {
                toast.error('This bill has already been deleted');
            }
            this.setState({
                bills: originalBills
            })
        }
    }
    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
    }

    handleBillSelect = (bill) => {
        this.setState({
            selectedBill: bill,
            searchQuery: "",
            currentPage: 1
        })
    }

    hanldeSort = (sortColumn) => {
        this.setState({
            sortColumn
        })
    }
    handleNewBill = (path) => {
        this.props.history.push(path)
    }
    handleSearch = query => {
        console.log(query)
        this.setState({
            searchQuery: query,
            selectedBill: null,
            currentPage: 1
        })
    }

    getPageData = () => {
        const { pageSize, currentPage, bills: allBills, selectedBill,sortColumn, searchQuery } = this.state;
        let filtered = allBills;

        if (searchQuery) {
            filtered = allBills.filter(s =>
                s.customerName.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedBill && selectedBill.id) {
            filtered = allBills.filter(s => s.bill.id === selectedBill.id);
        }

        //sorting bills with lodash
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const bills = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: bills, searchQuery }
    }

    getNewBillId = (allBills) => {
        const allBillsLen = allBills.length;
        let newBillIdStr;
        if (allBillsLen === 0) {
            newBillIdStr = '1';
        } else {
            console.log('alllBills',allBills)
            const lastBillId = allBills[allBillsLen - 1].id;
            console.log('lastBillId',lastBillId);
            let newBillId = lastBillId.substring(2, lastBillId.length);
            console.log('newBillId',newBillId)
            let newBillIdInt = parseInt(newBillId);
            console.log('newBillIdInt', newBillIdInt)
            newBillIdInt++;
            console.log(newBillIdInt.toString());
            newBillIdStr = newBillIdInt.toString();
        }

        console.log(newBillIdStr)


        if (newBillIdStr.length === 1) {
            let prefix = "B00000";
            const refactoredBillId = prefix.concat(newBillIdStr);
            console.log('refactoredBillId', refactoredBillId)
            return refactoredBillId;
        } else if (newBillIdStr.length === 2) {
            let prefix = "B0000";
            const refactoredBillId = prefix.concat(newBillIdStr);
            return refactoredBillId;
        } else if (newBillIdStr.length === 3) {
            let prefix = "B000";
            console.log('newBillIdStr',newBillIdStr)
            const refactoredBillId = prefix.concat(newBillIdStr);
            return refactoredBillId;
        } else if (newBillIdStr.length === 4) {
            let prefix = "B00";
            const refactoredBillId = prefix.concat(newBillIdStr);
            return refactoredBillId;
        } else if (newBillIdStr.length === 5) {
            let prefix = "B0";
            const refactoredBillId = prefix.concat(newBillIdStr);
            return refactoredBillId;
        } else {
            let prefix = "B";
            const refactoredBillId = prefix.concat(newBillIdStr);
            return refactoredBillId;
        }

    }

    render() {
        const { length: count } = this.state.bills;
        console.log(this.state.bills)
        const { pageSize, currentPage, bills: allBills, selectedBill, sortColumn, navBarItems, searchQuery } = this.state;
        console.log(allBills)
        const newBillId = this.getNewBillId(allBills);
        console.log('newBillId', newBillId);

        if (count === 0) {
            return <div className="container">
                <h1>Bills</h1>
                <Link
                to={{ pathname: "/bills/new", newId: newBillId }}
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
            >
                New Bill
        </Link>
            </div>
        }
        const { totalCount, data: bills } = this.getPageData();
        return (

            <div className="container">
                <h1>Bills</h1>
                <Link
                    to={{ pathname: "/bills/new", newId: newBillId }}
                    className="btn btn-primary"
                    style={{ marginBottom: 20 }}
                >
                    New Bill
                    </Link>
                <p>Showing {totalCount} bills in the database.</p>
                <SearchBox
                    value={searchQuery} onChange={this.handleSearch}></SearchBox>
                <BillTable
                    bills={bills}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.hanldeSort}
                ></BillTable>
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

export default Bills;