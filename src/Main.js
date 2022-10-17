import React, { useState, useContext } from "react";
import styles from "./Main.module.css";
import Reminder from "./Reminder";
import Modal from "./Modal";
import UserContext from "./userContext";
const Main = () => {
  const context = useContext(UserContext);
  return (
    <>
      <div
        className={styles.Main}
        style={{ backgroundColor: !context.lightMode ? "white" : "" }}
      >
        {
        context.dataSet?
        context.dataSet.length<1?<><h1 className={styles.logo}>My Remainders</h1>
        <p className={styles.error}>
          Oops... it seems like you don't have any reminders at the moment.
          <br />
          Click the button below to add a new one...
        </p></>:<Reminder />:""}
        <button name="add" onClick={context.overlayHandler}>Add a new reminder</button>
      </div>
      {context.overlay ? <Modal overlayHandler={context.overlayHandler} /> : ""}
    </>
  );
};

export default Main;
