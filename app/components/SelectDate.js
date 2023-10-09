"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const SelectDate = ({dateToPass, functionToPass}) => {
  // const [startDate, setStartDate] = useState(new Date());
  // useEffect(() => {
  //   console.log("New startDate ", startDate);
  // }, [startDate])

  const handlePassingFunct = (someDate) => {
    functionToPass(someDate);
  }
  
  let minimumDate = new Date();

  return (
    <DatePicker 
      selected={dateToPass} 
      onChange={(date) => handlePassingFunct(date)} 
      minDate={minimumDate}
      className="text-center border-l-4 border-red-600 w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-white"
    />
  );
};

export default SelectDate;