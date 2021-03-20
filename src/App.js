import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const useNotification = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      let listener = (event) => {
        const clientId = event.data.client;
        console.log(`receive message from ${clientId}`);
        setData(event.data);
      };
      navigator.serviceWorker.addEventListener("message", listener);
      return () => {
        navigator.serviceWorker.removeEventListener("message", listener);
      };
    }
  }, []);
  const postMessage = useCallback((message) => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  }, []);
  return [data, postMessage];
};

function App() {
  const [data, postMessage] = useNotification();
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{`receive message from ${data.client}`}</p>
        <p>{`message： ${data.message}`}</p>
        <button
          className="App-link"
          onClick={() => {
            postMessage(Math.random());
          }}
        >
          send
        </button>
      </header>
    </div>
  );
}

export default App;
