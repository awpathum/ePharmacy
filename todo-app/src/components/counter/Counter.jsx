import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Counter.css'

class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter: 0,
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }
    render() {
        return (
            <div className="counter">
                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
                <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
                <span className="count" >{this.state.counter}</span>
                <div className="reset" onClick={this.reset}><button>Reset</button></div>
            </div>
        )
    }

    reset() {

        this.setState(() => {
            return { counter: 0 }
        })
    }
    increment(by) {

        this.setState((prevState) => {
            return { counter: prevState.counter + by }
        })
    }
    decrement(by) {
        this.setState((prevState) => {
            return { counter: prevState.counter - by }
        })
    }


}

class CounterButton extends Component {


    render() {

        return (
            <div className="counter">
                <button onClick={()=>this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={()=>this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>

            </div>
        );
    }


}

Counter.defaultProps = {
    by: 1
}

Counter.prototypes = {
    by: PropTypes.number
}

export default Counter;