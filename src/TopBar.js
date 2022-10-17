import React, { useContext, useState } from "react";
import moon from "./images/moon.svg";
import sun from "./images/sun.svg";
import Modal from "./Modal";
import styles from "./TopBar.module.css"
import UserContext from "./userContext";
const TopBar = () => {
  const context=useContext(UserContext);
  return (
    <>
    <div className={styles.topBar} style={{backgroundColor:!context.lightMode?'white':""}}>
      {/* <h1 className={styles['btn']}>Remainder</h1> */}
      <h1 className={`${styles[`main-logo`]} ${styles.btn}`}>Reminder</h1>
      <div className={styles.options}>
        <img className={`${styles.modeBtn} ${styles.btn} `} src={context.lightMode?sun:moon} onClick={context.changeMode} alt="switch between light and dark mode" />
        <svg  className={styles.btn} onClick={context.overlayHandler}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="hsl(210, 77%, 69%)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </div>
      </div>
    </>
  );
};

export default TopBar;
