import React, { lazy, Suspense } from 'react';
import { Switch, Route, NavLink } from "react-router-dom";
// import Home from "./components/Home.jsx";
// import About from "./components/About.jsx";

import Loading from "./components/Loading.jsx";
const Home = lazy(() => import("./components/Home.jsx"));
const About = lazy(() => import("./components/About.jsx"));

export default function App() {
  return (
    <div>
      <NavLink
        to="/home"
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >Home</NavLink>
      <NavLink
        to="/about"
        activeStyle={{
          fontWeight: "bold",
          color: "red"
        }}
      >About</NavLink>
      <Suspense fallback={ <Loading /> }>
        <Switch>
          <Route path="/home" component={ Home }></Route>
          <Route path="/about" component={ About }></Route>
        </Switch>
      </Suspense>
    </div>
  )
}
