import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import cls from "./app.module.css";

import { FibonacciPage } from "../fibonacci-page/fibonacci-page";
import { ListPage } from "../list-page/list-page";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/queue-page";
import { SortingPage } from "../sorting-page/sorting-page";
import { StackPage } from "../stack-page/stack-page";
import { StringComponent } from "../string/string";

function App() {
  return (
    <div className={cls.app}>
      <HashRouter>
        <Switch>
          <Route path='/' exact>
            <MainPage />
          </Route>
          <Route path='/recursion'>
            <StringComponent />
          </Route>
          <Route path='/fibonacci'>
            <FibonacciPage />
          </Route>
          <Route path='/sorting'>
            <SortingPage />
          </Route>
          <Route path='/stack'>
            <StackPage />
          </Route>
          <Route path='/queue'>
            <QueuePage />
          </Route>
          <Route path='/list'>
            <ListPage />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
