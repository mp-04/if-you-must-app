import React, {Component} from 'react';


class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {inputUrl: ''}

  handleFunc = e => {
    e.preventDefault()
    fetch('/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    })
    .then(res => console.log('app;' + res))
  }


  render() {
    return (
      <div>
        <form id="submit-form" onSubmit={this.handleFunc}>
        {/* <form id="submit-form" action='/submit' method='post'> */}
          <input id="form" name="place" type="text" placeholder="...if you must..." value={this.state.inputUrl} onChange={e => this.setState({inputUrl: e.target.value})}>
          </input>
          <button id="submit">ADD</button>
        </form>
      </div>
    );
  }
}

export default App;