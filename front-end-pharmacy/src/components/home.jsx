import React, { Component } from 'react';
import ListGroup from './common/listGroup';
import { getStocks } from '../services/stockService';
import Warning from './warning';
import { getBills } from '../services/billService';
import { getDrugs } from '../services/drugService';
import auth from '../services/authService';
import Notification from './notification/notification';

class Home extends Component {
    state = {
        stocks: [],
        expStocks: [],
        lowStocks: [],
        bills: [],
        drugs: [],
        todayIncome: 0,
        customerCount: 0,
        user: ''
    }

    async componentDidMount() {
        let user = auth.getCurrentUser().sub;
        user = user.charAt(0).toUpperCase() + user.slice(1);
        console.log(user)
        const { data: stocks } = await getStocks();
        const { data: bills } = await getBills();
        const { data: drugs } = await getDrugs();
        console.log(drugs)

        this.setState({
            stocks,
            bills,
            user,
            drugs

        })
        console.log(this.state.user)
        this.getWarnings();
        this.getTodayIncome();
        this.getLowStocksWarnings();
    }

    getLowStocksWarnings = () => {
        const { drugs } = this.state;
        console.log('drugs', drugs)
        let lowStocks = [];
        let filterd = drugs.filter(d => (d.quantity < d.warningLevel))
        filterd.map(d => lowStocks.push(<Warning drugName={d.name} Drug={d} type='low'></Warning>));
        this.setState({ lowStocks })
    }


    getWarnings = () => {
        const today = this.getNotificationDate();
        console.log(today)
        const filtered = this.state.stocks.filter(s => s.quantity != 0);
        console.log('filterd', filtered)
        let expStocks = [];
        filtered.map(d => ((Date.parse(d.expDate) < Date.parse(today)) ? expStocks.push(<Warning expDate={d.expDate} drugName={d.drugName} Drug={d} type='exp'></Warning>) : console.log('not expired', d.expDate)))
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
        console.log(this.props)
        console.log(this.state.expStocks)
        //   return (
        //     <div>
        //         <center><img src="https://i.pinimg.com/originals/92/6c/3d/926c3d7db4b795a20175c3c59994c2f1.jpg" className="img-responsive" alt="Responsive image"></img></center>
        //         {/* <div className="row align-items-end">
        //             <div className="col">
        //                 One of three columns
        //     </div>
        //             <div className="col">
        //                 One of three columns
        //     </div>
        //             <div className="col">
        //                 One of three columns
        //     </div>
        //         </div> */}
        //     </div>
        // );


        return (
            
            <div className="container-fuid">
                <div className="row align-items-start">
                    <div className="col">
                        <Notification lowStocks={this.state.lowStocks} expStocks={this.state.expStocks}></Notification>
                    </div>
                    <div className="d-flex flex-row p-5"><h1>Welcome &nbsp; {this.state.user}</h1></div>
                    <div class="col">
                        <ul className="list-group m-2">
                            <div className="d-flex flex-row-reverse">
                                <span className="badge badge-info m-2 flex-row-reverse"><h3 className="m-3">Number of Customers <br></br>{this.state.customerCount} </h3></span>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <span className="badge badge-success m-2"><h3 className="m-3">Today's income <br></br>{this.state.todayIncome}</h3></span>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            
        );
    }
}

// background-image: url("https://images.wallpapersden.com/image/download/ubuntu-19-10_66736_3840x2160.jpg");
// position: fixed;
// min-width: 100%;
// min-height: 100%;
// background-size: cover;
// background-position: center;

export default Home;