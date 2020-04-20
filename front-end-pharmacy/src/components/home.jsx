import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import { getStocks } from '../services/stockService';
import Warning from './warning';

class Home extends Component {
    state = {
        stocks: [],
        expStocks: [],


    }

    async componentDidMount() {
        const { data } = await getStocks();

        this.setState({
            stocks: data
        })
        this.getWarnings();
        this.getCurrentDate();
    }

    getWarnings = () => {
        const today = this.getCurrentDate();
        console.log(today)
        const filtered = this.state.stocks.filter( s => s.quantity != 0);
        console.log(filtered)
        let expStocks = [];
        filtered.map(d => ((Date.parse(d.expDate) < Date.parse(today)) ? expStocks.push(<Warning expDate = {d.expDate}></Warning>) : console.log('not expired', d.expDate)))
        this.setState({
            expStocks
        })
    }

    getCurrentDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        // today = mm + '-' + dd + '-' + yyyy;
        today = yyyy + '-' + mm + '-' + dd;
        // console.log('today', today);
        return today;
    }

    render() {
        console.log(this.state.expStocks)
        return (
            <div className="row">
                <h1>Home</h1>
                <div className="col-2">
                    {this.state.expStocks}
                </div>

            </div>
        );
    }
}

export default Home;