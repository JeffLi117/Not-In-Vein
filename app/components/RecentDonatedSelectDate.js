"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { isPast } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const RecentlyDonatedSelectDate = ({dateToPass, functionToPass, earliestPossDonation}) => {
  // const [startDate, setStartDate] = useState(new Date());
  // useEffect(() => {
  //   console.log("New startDate ", startDate);
  // }, [startDate])

  const handlePassingFunct = (someDate) => {
    functionToPass(someDate);
  }

  return (
    <DatePicker 
      selected={isPast(dateToPass)?new Date() :dateToPass} 
      onChange={(date) => handlePassingFunct(date)} 
      minDate={isPast(earliestPossDonation)?new Date() :earliestPossDonation}
      className="text-center border-l-4 border-red-600 w-full p-3 rounded text-sm  outline-none  focus:ring-0 bg-white"
    />
  );
};

export default RecentlyDonatedSelectDate;