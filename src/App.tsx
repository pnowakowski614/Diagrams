import Diagram from "./app/views/diagram/Diagram";
import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/views/login/Login";
import List from "./app/views/list/list";
import Header from "./app/components/Header/Header"
import styles from "./App.module.scss";

const App = () => {
    return (
        <div className={styles.wrapper}>
            <Header/>
            <main className={styles.content}>
                <Route path="/" exact component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/diagram" component={Diagram}/>
                <Route path="/list" component={List}/>
            </main>
        </div>
    )
}

export default App;