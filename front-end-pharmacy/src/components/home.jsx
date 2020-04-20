import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import { getStocks } from '../services/stockService';
import Warning from './warning';
import { getBills } from '../services/billService';

class Home extends Component {
    state = {
        stocks: [],
        expStocks: [],
        bills: [],
        todayIncome: 0,
        customerCount: 0


    }

    async componentDidMount() {
        const { data: stocks } = await getStocks();
        const { data: bills } = await getBills();

        this.setState({
            stocks,
            bills
        })
        this.getWarnings();
        this.getTodayIncome();
    }



    getWarnings = () => {
        const today = this.getNotificationDate();
        console.log(today)
        const filtered = this.state.stocks.filter(s => s.quantity != 0);
        console.log('filterd', filtered)
        let expStocks = [];
        filtered.map(d => ((Date.parse(d.expDate) < Date.parse(today)) ? expStocks.push(<Warning expDate={d.expDate} drugName={d.drugName} Drug={d}></Warning>) : console.log('not expired', d.expDate)))
        this.setState({
            expStocks
        })
    }

    getNotificationDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        // today.getMonth() + 1) this gives today date 
        var mm = String(today.getMonth() + 2).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        // today = mm + '-' + dd + '-' + yyyy;
        today = yyyy + '-' + mm + '-' + dd;
        // console.log('today', today);
        return today;
    }

    getCurrentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        // today.getMonth() + 1) this gives today date 
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        // today = mm + '-' + dd + '-' + yyyy;
        today = yyyy + '-' + mm + '-' + dd;
        // console.log('today', today);
        return today;
    }

    getTodayIncome = () => {
        const today = this.getCurrentDate();
        const filtered = this.state.bills.filter(b => (b.date === today));
        const customerCount = filtered.length;
        let income = [];
        filtered.map(b => income.push(b.totalPrice));
        console.log('filtered', filtered)
        let todayIncome = income.reduce((partial_sum, a) => partial_sum + a, 0);
        console.log("todayIncome", todayIncome)
        this.setState({ todayIncome, customerCount })

    }

    //     <div class="row">
    //   <div class="col-12 col-md-8">.col-12 .col-md-8</div>
    //   <div class="col-6 col-md-4">.col-6 .col-md-4</div>
    // </div>

    render() {
        console.log(this.state.expStocks)
        return (

            <div className="row">
                <div className="col-6 col-md-4">
                    <ul className="list-group">
                        {this.state.expStocks}
                    </ul>
                </div>
                <div className="col-12 col-md-8">
                    <span class="badge badge-info"><h3>Today's income {this.state.todayIncome} rupees.</h3></span>
                    <br></br>
                    <span class="badge badge-success"><h3>Number of Customers {this.state.customerCount} </h3></span>

                </div>


            </div>
        );
    }
}

export default Home;