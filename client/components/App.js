import React, { Component } from "react";
import Links from "./Links";
// import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = { inputUrl: "", wordArr: [] };

  componentDidMount() {
    const urlArr = [];
    fetch("http://localhost:3000/").then((data) => {
      data.json().then((data) => {
        data.forEach((item) => urlArr.push(item["url"]));
        this.setState({ wordArr: urlArr });
      });
    });
  }

  handleFunc = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/submit/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: this.state.inputUrl }),
    }).then((res) => console.log(res));
  };
  render() {
    return (
      <div>
        <form id="submit-form" onSubmit={this.handleFunc}>
          <input
            id="form"
            name="place"
            type="text"
            placeholder="...if you must..."
            value={this.state.inputUrl}
            onChange={(e) => this.setState({ inputUrl: e.target.value })}
          ></input>
          <button id="submit">ADD</button>
        </form>
        {this.state.wordArr.map((url, index) => {
          return (
            <div className="url-list" key={index}>
              <p>
                url:&nbsp;
                <a href={url}>{url}</a>
              </p>
              <button>delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
