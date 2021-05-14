import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useNotification } from "./hooks/useNotification";

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
