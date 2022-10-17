import React, { useContext, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";
import UserContext from "./userContext";
var newObj;
const Modal = () => {
  const context = useContext(UserContext);

  if (context.editvalue != 0) {
    var editObj = context.dataSet.filter((obj) => {
      return obj.id == context.editValue;
    });
  }
  // if(context.editValue!=0){
  //   console.log(editObj[0].id);
  // }

  const [overview, SetOverview] = useState("");
  const [vibrate, setVibrate] = useState(false);
  const [title, setTitle] = useState(
    context.editValue != 0 ? editObj[0].title : ""
  );
  const [time, setTime] = useState({
    hours: context.editValue != 0 ? editObj[0].time.hours : 0,
    minutes: context.editValue != 0 ? editObj[0].time.minutes : 0,
    seconds: context.editValue != 0 ? editObj[0].time.seconds : 0,
  });

  ///rough
  useEffect(
    (e) => {
      SetOverview(
        `${title} ${
          (time.hours > 0 || time.minutes > 0 || time.seconds > 0) &&
          title.length > 0
            ? " every "
            : ""
        } ${
          time.hours > 0 && title.length > 0 ? +time.hours + " hours " : ""
        } ${
          time.minutes > 0 && title.length > 0 ? time.minutes + " minutes " : ""
        } ${
          time.seconds > 0 && title.length > 0
            ? " " + time.seconds + " seconds "
            : ""
        } `
      );
    },
    [time, vibrate, title]
  );
  ///
  ///rough

  const addHandler = (event) => {
    event.preventDefault();
    context.overlayHandler();
    newObj = {
      id:
        context.editValue != 0
          ? editObj[0].id
          : Math.random() * Math.random() + Math.random() * Math.random(),
      title: title,
      time: {
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds,
      },
      vibrate: vibrate,
      date: context.currentDate,
    };
    // context.dataSet.push(newObj);
    ///updating
    if (context.editValue == 0) {
      context.setDataSet((prevState) =>
        prevState ? [...prevState, newObj] : []
      );
      console.log("added");
    } else {
      const newState = context.dataSet.map((obj) => {
        if (obj.id == context.editValue) {
          console.log("case1");
          return { ...newObj };
        }
        console.log("case2");
        // console.log("done 2");
        return obj;
      });
      context.setDataSet(newState);
      console.log(context.dataSet.findIndex((x) => x.id == editObj[0].id));
    }
  };

  ///rough
  useEffect(() => {
    newObj = {
      id:
        context.editValue != 0
          ? editObj[0].id
          : Math.random() * Math.random() + Math.random() * Math.random(),
      title: context.editValue != 0 ? editObj[0].title : title,
      time: {
        hours: context.editValue != 0 ? editObj[0].time.hours : time.hours,
        minutes:
          context.editValue != 0 ? editObj[0].time.minutes : time.minutes,
        seconds:
          context.editValue != 0 ? editObj[0].time.seconds : time.seconds,
      },
      vibrate: context.editValue != 0 ? editObj[0].vibrate : vibrate,
      date:
        context.editValue != 0 ? editObj[0].currentDate : context.currentDate,
    };

    return () => {};
  }, [title, time, vibrate, context.editValue, context.currentDate, editObj]);

  ///rough
  const universalHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "title") {
      setTitle(e.target.value);
    } else if (name === "hours") {
      setTime((prevState) => ({
        ...prevState,
        hours: value,
      }));
    } else if (name === "minutes") {
      setTime((prevState) => ({
        ...prevState,
        minutes: value,
      }));
    } else if (name === "seconds") {
      setTime((prevState) => ({
        ...prevState,
        seconds: value,
      }));
    } else if (name === "vibrate") {
      setVibrate(!vibrate);
    }
  };
  const mainDeleteHandler = () => {
    // var newArray=context.dataSet.filter((obj)=>e.target.name!=obj.id);
    var newArray = context.dataSet.filter(
      (obj) => context.deleteValue != obj.id
    );
    context.setDataSet(newArray);
    context.setDeleteValue(0);
    context.overlayHandler();
  };
  return ReactDOM.createPortal(
    <>
      <div
        id="backDrop"
        onClick={(e) => {
          if (e.target.id === "backDrop") {
            context.overlayHandler();
            context.setEditValue(0);
            context.setDeleteValue(0);
          }
        }}
        className={styles.backdrop}
      >
        {context.deleteValue != 0 ? (
          <div className={styles.delete}>
            <h1>Delete Reminder</h1>
            <p>Are you sure you want to delete this reminder?</p>
            <div>
              <button
                onClick={mainDeleteHandler}
                className={`${styles.btn} ${styles.cancel}`}
              >
                Yes,Delete
              </button>
              <button
                className={`${styles.btn} ${styles.deleteCancel}`}
                onClick={() => {
                  context.overlayHandler();
                  context.setEditValue(0);
                  context.setDeleteValue(0);
                }}
              >
                Cancle
              </button>
            </div>
          </div>
        ) : (
          <div name="overlay" className={styles.overlay}>
            <form onSubmit={addHandler} action="">
              <h1 className={styles.add}>Add a new reminder</h1>
              <h3 className={styles.title}>Reminder Title</h3>
              <input
                className={styles.Input}
                type="text"
                name="title"
                placeholder="Drink Water"
                value={title}
                onChange={universalHandler}
              />
              <div className={`${styles[`time-container`]}`}>
                <div className={`${styles[`hour-container`]}`}>
                  <p>Hours</p>
                  <select
                    onChange={universalHandler}
                    name="hours"
                    default=""
                    disabled=""
                    value={time.hours}
                    className={styles.hours}
                  >
                    <option default disabled="true">
                      Hours
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">25</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                  </select>
                </div>
                <div className={`${styles[`minutes-container`]}`}>
                  <p>Minutes</p>
                  <select
                    onChange={universalHandler}
                    name="minutes"
                    className={styles.minutes}
                    value={time.minutes}
                  >
                    <option default="" disabled="true">
                      Minutes
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                    <option value="60">60</option>
                  </select>
                </div>
                <div className={`${styles[`seconds-container`]}`}>
                  <p>Seconds</p>
                  <select
                    onChange={universalHandler}
                    name="seconds"
                    className={styles.seconds}
                    value={time.seconds}
                  >
                    <option default="" disabled="true">
                      Seconds
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                    <option value="32">32</option>
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                    <option value="37">37</option>
                    <option value="38">38</option>
                    <option value="39">39</option>
                    <option value="40">40</option>
                    <option value="41">41</option>
                    <option value="42">42</option>
                    <option value="43">43</option>
                    <option value="44">44</option>
                    <option value="45">45</option>
                    <option value="46">46</option>
                    <option value="47">47</option>
                    <option value="48">48</option>
                    <option value="49">49</option>
                    <option value="50">50</option>
                    <option value="51">51</option>
                    <option value="52">52</option>
                    <option value="53">53</option>
                    <option value="54">54</option>
                    <option value="55">55</option>
                    <option value="56">56</option>
                    <option value="57">57</option>
                    <option value="58">58</option>
                    <option value="59">59</option>
                    <option value="60">60</option>
                  </select>
                </div>
              </div>
              <div className={styles.vibrate}>
                <label htmlFor="vibrate">Vibrate</label>
                <input
                  className={styles.label}
                  type="checkbox"
                  name="vibrate"
                  id="vibrate"
                  onChange={universalHandler}
                />
              </div>
              <div className={styles.overview}>
                <h1>Overview</h1>
                <p>{`${
                  overview.length > 5 ? "Remind Me to" : ""
                } ${overview}`}</p>
              </div>
              <div className={styles.buttons}>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles.create}`}
                  onClick={addHandler}
                  name="add"
                >
                  {context.editValue!=0?"Edit This Reminder":"Add New Reminder"}
                </button>
                <button
                  name="add"
                  className={`${styles.btn} ${styles.cancel}`}
                  onClick={context.overlayHandler}
                >
                  Cancle
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>,
    document.getElementById(`modal`)
  );
};

export default Modal;
