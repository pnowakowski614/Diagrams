import Diagram from "./app/views/Diagram/Diagram";
import React from "react";
import { Route } from "react-router-dom";
import Login from "./app/views/Login/Login";
import DiagramList from "./app/views/DiagramList/DiagramList";
import Header from "./app/components/Header/Header";
import styles from "./App.module.scss";
import SignUp from "./app/views/SignUp/SignUp";
import { ProtectedRoute } from "./app/components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <ProtectedRoute path="/diagram">
          <Diagram />
        </ProtectedRoute>
        <ProtectedRoute path="/list">
          <DiagramList />
        </ProtectedRoute>
      </main>
    </div>
  );
};

export default App;
