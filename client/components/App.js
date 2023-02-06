import React, { Component, useEffect, useState } from "react";
import Links from "./Links";

const App = () => {
  const [inputUrl, setInputUrl] = useState("");

  const handleAddUrl = () => {
    isValidUrl(inputUrl)
      ? fetch("http://localhost:3000/submit/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: inputUrl }),
        }).then((res) => console.log(res))
      : "";
  };

  const isValidUrl = (string) => {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (error) {
      return false;
    }
  };

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
        <Links />
      </div>
    </>
  );
};

export default App;
