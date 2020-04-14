import React, { Component } from 'react';
import TodoApp from './components/todo/TodoApp';
import './App.css';
import './bootstrap.css';
//import FirstComponent from './components/learning-examples/FirstComponent'



class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Counter></Counter> */}
        <TodoApp></TodoApp>
        
      </div>
    );
  }
}

export default App;
