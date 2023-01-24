import React, { Component } from "react";
import Links from "./Links";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = { inputUrl: "", wordArr: [], imageArr: [] };

  componentDidMount() {
    this.handleGetUrls();
  }

  handleGetUrls = () => {
    const urlArr = [];
    const tempImg = [];
    fetch("http://localhost:3000/").then((data) => {
      data.json().then((data) => {
        data.info.forEach((item) => {
          urlArr.push(item["displayUrl"]);
          tempImg.push(item["image"]);
        });
        this.setState({ wordArr: urlArr, imageArr: tempImg });
      });
    });
  };

  handleAddUrl = () => {
    this.isValidUrl(this.state.inputUrl)
      ? fetch("http://localhost:3000/submit/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: this.state.inputUrl }),
        }).then((res) => console.log(res))
      : "";
  };

  handleDeleteUrl = (e) => {
    const classNameSelector = `.y${e.target.id}`;
    const urltoDelete = document
      .querySelector(classNameSelector)
      .querySelector("a").innerText;
    fetch("http://localhost:3000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deleteUrl: urltoDelete,
      }),
    })
      .then(this.handleGetUrls())
      .then(this.setState());
  };

  isValidUrl = (string) => {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (error) {
      return false;
    }
  };

  render() {
    return (
      <>
        <div>
          <form id="submit-form" onSubmit={this.handleAddUrl}>
            <input
              id="form"
              name="place"
              type="text"
              placeholder="...if you must..."
              value={this.state.inputUrl}
              onChange={(e) => this.setState({ inputUrl: e.target.value })}
            ></input>
            {this.isValidUrl(this.state.inputUrl) ? (
              <button id="submit">ADD</button>
            ) : (
              <button id="disabled">ADD</button>
            )}
          </form>
          {this.state.wordArr.map((url, index) => {
            return (
              <div className={`url-list ${"y" + index.toString()}`} key={index}>
                {/* url:&nbsp; */}
                <img
                  src={this.state.imageArr[index]}
                  alt=""
                  height={125}
                  width={125}
                />
                <a href={url}>{url}</a>
                <button onClick={this.handleDeleteUrl} id={index}>
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
