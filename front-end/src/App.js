import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat}></Route>
    </BrowserRouter>
  );
};

export default App;
