import Diagram from "./app/views/Diagram/Diagram";
import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/views/Login/Login";
import DiagramList from "./app/views/DiagramList/DiagramList";
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
                <Route path="/list" component={DiagramList}/>
            </main>
        </div>
    )
}

export default App;