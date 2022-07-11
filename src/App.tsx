import Diagram from "./app/views/diagram/Diagram";
import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/views/login/login";
import List from "./app/views/list/list";
import Header from "./app/components/Header"

const App = () => {
    return(
        <>
            <Header />
            <main>
                <Route path="/" exact component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/diagram" component={Diagram} />
                <Route path="/list" component={List} />
            </main>
        </>
    )
}

export default App;