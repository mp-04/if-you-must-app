import React, { Component, useState, useEffect } from "react";

const Links = () => {
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
    });
    handleGetUrls();
  };

  useEffect(() => {
    handleGetUrls();
  }, []);

  return (
    <div>
      {wordArr.map((url, index) => {
        return (
          <div className={`url-list ${"y" + index.toString()}`} key={index}>
            <img src={imageArr[index]} alt="" height={125} width={125} />
            <a href={url}>{url}</a>
            <button onClick={handleDeleteUrl} id={index}>
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Links;
