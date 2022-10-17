import TopBar from "./TopBar";
import Main from "./Main";
import { useEffect, useState } from "react";
import UserContext from "./userContext";
const App = () => {
  const [d, setDate] = useState(new Date());
  const [lightMode, setLightMode] = useState(true);
  const changeMode = () => {
    setLightMode(!lightMode);
  };

  const [overlay, setOverlay] = useState(false);


  const [dataSet, setDataSet] = useState([]);

  const [filteredList, setFilteredList] = useState("");

  const [editValue, setEditValue] = useState("0");

  const [deleteValue,setDeleteValue]=useState(0);

  const overlayHandler = (e) => {
    if(overlay){
       setEditValue(0);
    }
    setOverlay(!overlay);
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //time
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  const currentDate =
    days[d.getDay()] +
    " , " +
    d.getDate() +
    "  " +
    months[d.getMonth()] +
    " " +
    d.getFullYear() +
    " " +
    time;
  //dataSet

  ///data

  //useffect updating time/date
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <UserContext.Provider
      value={{
        lightMode,
        changeMode,
        overlayHandler,
        overlay,
        dataSet,
        setDataSet,
        currentDate,
        filteredList,
        setFilteredList,
        editValue,
        setEditValue,
        deleteValue,
        setDeleteValue
      }}
    >
      <TopBar
      // lightMode={lightMode}
      // changemode={changeMode}
      // overlayHandler={overlayHandler}
      />
      <Main
      // lightMode={lightMode}
      // overlayHandler={overlayHandler}
      // overlay={overlay}
      />
    </UserContext.Provider>
  );
};
export default App;
