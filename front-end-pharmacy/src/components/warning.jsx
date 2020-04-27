import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Warning extends Component {
    state = {
        today: '',
    }

    componentDidMount() {
        this.getCurrentDate();
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
        this.setState({
            today
        })
    }

    render() {


        return (
            (this.props.type === 'exp') ?
                (<div class="card w-30">
                    <div class="card-body">
                        {(this.state.today > this.props.Drug.expDate) ? <h5 class="card-title text-danger">{this.props.Drug.drugName}</h5> : <h5 class="card-title text-warning">{this.props.Drug.drugName}</h5>}

                        <p class="card-text"> {this.props.Drug.drugName} stock is going to expire on {this.props.Drug.expDate}.</p>
                        {/* <a href="#" class="btn btn-primary">See Stock</a> */}
                        <Link to={`/stocks/${this.props.Drug.id}`}>Go To Stock</Link>
                    </div>
                </div>) : (
                    <div>
                        <div class="card w-30">
                            <div class="card-body">
                                {<h5 class="card-title text-danger">{this.props.Drug.name}</h5>} Inventory is low. Remains only {this.props.Drug.quantity}.<br></br>
                                <Link to={'/suppliers/'}>Go To Suppliers</Link>
                </div>
                        </div>
                    </div>
                )
        );
    }
}

export default Warning;