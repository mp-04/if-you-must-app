import React, { Component, useEffect, useState } from "react";
import Links from "./Links";

const App = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [wordArr, setWordArr] = useState([]);
  const [imageArr, setImageArr] = useState([]);

  const handleGetUrls = () => {
    const urlArr = [];
    const tempImg = [];
    fetch("http://localhost:3000/").then((data) => {
      data.json().then((data) => {
        data.info.forEach((item) => {
          urlArr.push(item["displayUrl"]);
          tempImg.push(item["image"]);
        });
        setWordArr(urlArr);
        setImageArr(tempImg);
      });
    });
  };

  const handleAddUrl = () => {
    isValidUrl(inputUrl)
      ? fetch("http://localhost:3000/submit/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: inputUrl }),
        }).then((res) => console.log(res))
      : "";
  };

  const handleDeleteUrl = (e) => {
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
    }).then(handleGetUrls());
  };

  const isValidUrl = (string) => {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    handleGetUrls();
  }, []);

  return (
    <>
      <div>
        <form id="submit-form" onSubmit={handleAddUrl}>
          <input
            id="form"
            name="place"
            type="text"
            placeholder="...if you must..."
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          ></input>
          {isValidUrl(inputUrl) ? (
            <button id="submit">ADD</button>
          ) : (
            <button id="disabled">ADD</button>
          )}
        </form>
        {wordArr.map((url, index) => {
          return (
            <div className={`url-list ${"y" + index.toString()}`} key={index}>
              {/* url:&nbsp; */}
              <img src={imageArr[index]} alt="" height={125} width={125} />
              <a href={url}>{url}</a>
              <button onClick={handleDeleteUrl} id={index}>
                delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
