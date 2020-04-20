import React, { Component } from 'react';

class Warning extends Component {
    state = {  }
    render() { 
        return ( 
            <div class="card">
            <div class="card-body">
        <h5 class="card-title">{this.props.expDate}</h5>
              <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
         );
    }
}
 
export default Warning;