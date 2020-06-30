import React, { Component } from 'react';
import Pagination from '../common/pagination';
import _ from 'lodash';
import { paginate } from '../../utils/paginate';
class Notification extends Component{
    state = {
        currentPage: 1,
        pageSize: 5,
    }
    componentDidMount(){
        //totalCount = this.props.lowStocks.length
        console.log('low stocks',this.props.lowStocks.length)
    }
    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        });
    }
    getPageData = () => {
        var allWarnings = this.props.lowStocks.concat(this.props.expStocks)
        
        const { pageSize, currentPage, stocks: allStocks, selectedSupplier, sortColumn, searchQuery } = this.state;
        let filtered = allWarnings;
        
        //sorting stocks with lodash
        const sorted = _.orderBy(filtered)
        const stocks = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: stocks, searchQuery }
    }

    render(){
        const { totalCount, data: stocks } = this.getPageData();
        console.log("notificationComponent",this.props)
        console.log('low stocks',this.props.expStocks.length)
        var expStocks = this.props.expStocks.length
        var lowStocks = this.props.lowStocks.length
        // var totalCount = expStocks + lowStocks
        return(
            <div>
             <ul className="list-group m-2">
                            {stocks}
                          
                        </ul>
                        <Pagination
                        itemsCount={totalCount}
                        pageSize={this.state.pageSize}
                        currentPage={this.state.currentPage}
                        onPageChange={this.handlePageChange}>
                    </Pagination>
                    </div>
        );
    }
}
export default Notification;