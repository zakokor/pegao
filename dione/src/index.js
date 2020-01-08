import "./main.scss";
import React from "react";
import ReactDOM from "react-dom";
import Routes from './components/Routes';

const App = () => {
  return (
    <Routes />
  );
};

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;