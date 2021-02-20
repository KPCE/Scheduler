
import DayList from "components/DayList"
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import "components/Appointment"
import Appointment from "components/Appointment";
import useApplicationData from "../hooks/useApplicationData"
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
const axios = require('axios').default;


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  

  const interviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  // console.log("dailyAppointments", dailyAppointments)

  const schedule = dailyAppointments.map(appointment => {
    return (
    <Appointment 
      {...appointment}  
      key = {appointment.id} 
      interview = {getInterview(state, appointment.interview)}
      id = {appointment.id}
      time = {appointment.time}
      interviewers = {interviewers}
      bookInterview = {bookInterview}
      cancelInterview = {cancelInterview}
    />
    );
    })


    
    
  // console.log(state)
  //console.log(day)
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
