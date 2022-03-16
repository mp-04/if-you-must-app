import React from 'react';
import {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <form id="submit-form">
          <input id="form" type="text" placeholder="...if you must..."></input>
          <button id="submit">ADD</button>
        </form>
      </div>
    );
  }
}

export default App;