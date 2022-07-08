import Diagram from "./app/views/diagram/diagram";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./app/views/login/login";
import List from "./app/views/list/list";
import Header from "./app/shared_components/header"

const App = () => {
    return(
        <div>
            <Header />
            <main>
                <Route path="/" exact>
                    <Redirect to="/login"/>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/diagram">
                    <Diagram />
                </Route>
                <Route path="/list">
                    <List />
                </Route>
            </main>
        </div>
    )
}

export default App;