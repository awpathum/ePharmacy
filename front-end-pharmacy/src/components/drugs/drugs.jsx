import React, { Component } from 'react';
import {getDrugs,deleteDrug} from '../../services/drugService';
import { Route, Link } from "react-router-dom";
import Pagination from "../common/pagination";
import { paginate } from '../../utils/paginate';
import ListGroup from "../common/listGroup";
import SearchBox from "../common/searchBox";
import DrugTable from './drugTable'
import { toast } from "react-toastify";
import _ from 'lodash';

class Drugs extends Component {
    state = {
        drugs: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: "",
        selectedDrug: null,
        sortColumn: { path: 'title', order: 'asc' },
    }

    async componentDidMount() {
        const { data } = await getDrugs();
        console.log(data)
        this.setState({
            drugs : data
        })
    }

    handleDelete = async (drug) => {

        const originalDrugs = this.state.drugs;
        const drugs = originalDrugs.filter(s => s.id !== drug.id);
        console.log(drug)
        this.setState({
            drugs
        });
        try {
            console.log(drug)
            const res = await deleteDrug(drug.id);
            console.log(drug.id)
        } catch (ex) {
            console.log(ex)
            if (ex.response && ex.response.status === 404) {
                toast.error('This drug has already been deleted');
            }
            this.setState({
                drugs: originalDrugs
            })
        }
    }
    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
    }

    handleDrugSelect = (drug) => {
        this.setState({
            selectedDrug: drug,
            searchQuery: "",
            currentPage: 1
        })
    }

    hanldeSort = (sortColumn) => {
        this.setState({
            sortColumn
        })
    }
    handleNewDrug = (path) => {
        this.props.history.push(path)
    }
    handleSearch = query => {
        console.log(query)
        this.setState({
            searchQuery: query,
            selectedDrug: null,
            currentPage: 1
        })
    }

    getPageData = () => {
        const { pageSize, currentPage, drugs: allDrugs, selectedDrug,sortColumn, searchQuery } = this.state;
        let filtered = allDrugs;

        if (searchQuery) {
            filtered = allDrugs.filter(s =>
                s.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedDrug && selectedDrug.id) {
            filtered = allDrugs.filter(s => s.drug.id === selectedDrug.id);
        }

        //sorting drugs with lodash
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const drugs = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: drugs, searchQuery }
    }

    getNewDrugId = (allDrugs) => {
        const allDrugsLen = allDrugs.length;
        let newDrugIdStr;
        if (allDrugsLen === 0) {
            newDrugIdStr = '1';
        } else {
            console.log('alllDrugs',allDrugs)
            const lastDrugId = allDrugs[allDrugsLen - 1].id;
            console.log('lastDrugId',lastDrugId);
            let newDrugId = lastDrugId.substring(2, lastDrugId.length);
            console.log('newDrugId',newDrugId)
            let newDrugIdInt = parseInt(newDrugId);
            console.log('newDrugIdInt', newDrugIdInt)
            newDrugIdInt++;
            console.log(newDrugIdInt.toString());
            newDrugIdStr = newDrugIdInt.toString();
        }

        console.log(newDrugIdStr)


        if (newDrugIdStr.length === 1) {
            let prefix = "D00000";
            const refactoredDrugId = prefix.concat(newDrugIdStr);
            console.log('refactoredDrugId', refactoredDrugId)
            return refactoredDrugId;
        } else if (newDrugIdStr.length === 2) {
            let prefix = "D0000";
            const refactoredDrugId = prefix.concat(newDrugIdStr);
            return refactoredDrugId;
        } else if (newDrugIdStr.length === 3) {
            let prefix = "D000";
            console.log('newDrugIdStr',newDrugIdStr)
            const refactoredDrugId = prefix.concat(newDrugIdStr);
            return refactoredDrugId;
        } else if (newDrugIdStr.length === 4) {
            let prefix = "D00";
            const refactoredDrugId = prefix.concat(newDrugIdStr);
            return refactoredDrugId;
        } else if (newDrugIdStr.length === 5) {
            let prefix = "D0";
            const refactoredDrugId = prefix.concat(newDrugIdStr);
            return refactoredDrugId;
        } else {
            let prefix = "D";
            const refactoredDrugId = prefix.concat(newDrugIdStr);
            return refactoredDrugId;
        }

    }

    render() {
        const { length: count } = this.state.drugs;
        console.log(this.state.drugs)
        const { pageSize, currentPage, drugs: allDrugs, selectedDrug, sortColumn, navBarItems, searchQuery } = this.state;
        console.log(allDrugs)
        const newDrugId = this.getNewDrugId(allDrugs);
        console.log('newDrugId', newDrugId);

        if (count === 0) {
            return <div>
                <h1>Drugs</h1>
                <Link
                to={{ pathname: "/drugs/new", newId: newDrugId }}
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
            >
                New Drug
        </Link>
            </div>
        }
        const { totalCount, data: drugs } = this.getPageData();
        return (

            <div className="container">
                <h1>Drugs</h1>
                <Link
                    to={{ pathname: "/drugs/new", newId: newDrugId }}
                    className="btn btn-primary"
                    style={{ marginBottom: 20 }}
                >
                    New Drug
                    </Link>
                <p>Showing {totalCount} drugs in the database.</p>
                <SearchBox
                    value={searchQuery} onChange={this.handleSearch}></SearchBox>
                <DrugTable
                    drugs={drugs}
                    sortColumn={sortColumn}
                    onLike={this.handleLike}
                    onDelete={this.handleDelete}
                    onSort={this.hanldeSort}
                ></DrugTable>
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

export default Drugs;