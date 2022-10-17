import React, { useContext, useEffect } from "react";
import clock from "./images/clock.svg";
import trash from "./images/trash.svg";
import edit from "./images/edit.svg";
import styles from "./Reminder.module.css";
import UserContext from "./userContext";
import Modal from "./Modal";
const Reminder = () => {
  const context = useContext(UserContext);
  const deleteHandler=(e)=>{
    //  console.log("name:"+e.target.name);
    context.setDeleteValue(e.target.name);
    context.overlayHandler();
    // console.log(newArray);
  }
  const editHandler=(e)=>{
    context.setEditValue(e.target.name);
    context.overlayHandler();
  }
 
  return context.dataSet.map((data, index) => (
    <div key={data.id} className={`${styles[`reminder-container`]}`}>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.duration}>{`${data.title} ${
        (data.time.hours > 0 ||
          data.time.minutes > 0 ||
          data.time.seconds > 0) &&
        data.title.length > 0
          ? " every "
          : ""
      } ${
        data.time.hours > 0 && data.title.length > 0
          ? +data.time.hours + " hours "
          : ""
      } ${
        data.time.minutes > 0 && data.title.length > 0
          ? data.time.minutes + " minutes "
          : ""
      } ${
        data.time.seconds > 0 && data.title.length > 0
          ? " " + data.time.seconds + " seconds "
          : ""
      } `}</p>
      <div className={styles.bottom}>
        <div className={`${styles[`date-created`]}`}>
          <img className={styles.icon} src={clock} alt="a clock icon"></img>
          <small>{data.date}</small>
        </div>
        <div className={`${styles[`edit-and-delete`]}`}>
          <img
            className={`${styles[`icon`]} ${styles[`delete`]}`}
            src={edit}
            onClick={editHandler}
            name={data.id}
            alt="edit your reminder"
          />
          <img
            className={styles.icon}
            src={trash}
            name={data.id}
             onClick={deleteHandler}
            alt="delete your remindr"
          />
        </div>
      </div>
    </div>
  ));
};

export default Reminder;
