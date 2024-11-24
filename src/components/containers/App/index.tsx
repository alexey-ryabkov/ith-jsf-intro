import React from "react";
import { Counter } from "@features/counter/Counter";
import { ReactComponent as Logo } from "@assets/icons/logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo w-step-10" />
        <div className="mb-10">
          <p className="paragraph bordered rounded-sm spaced-2-4">
            This high quality everyday secateur features a fully hardened and
            tempered, high-carbon steel blade for lasting sharpness. For
            comfort, the robust but lightweight alloy handles are covered
            in a soft grip, in a bright terracotta colour for maximum visibility
            in the garden. It won’t be easy to leave this pruner behind at the
            end of the day! Rubber cushion stops prevent jarring over repeated
            use, reducing hand strain for the user.
          </p>
          <p className="paragraph">
            This secateur cuts up to 2.5 cm diameter. Carrying RHS endorsement,
            possibly the highest accolade in gardening, for peace of mind this
            pruner comes with a ten-year guarantee against man
          </p>
          <a className="link" href="#">
            Read more
          </a>
        </div>
        <hr className="divider" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
