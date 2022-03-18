import React, {Component} from 'react';
import Links from './Links'
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";


class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {inputUrl: ''};
  value = [];


  handleFunc = e => {
    e.preventDefault()
    fetch('/submit', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        this.value.push(result[i].url)
      }
      // value = result;
      console.log(this.value);
    })
    // console.log(this.props.dbResult);
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
        {/* {outputUrl} */}
        {/* <Links value={this.value} /> */}
        {/* {this.value} */}
      </div>
    );
  }
}

export default App;