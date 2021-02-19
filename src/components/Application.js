
import DayList from "components/DayList"
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import "components/Appointment"
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"
const axios = require('axios').default;


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  // console.log("dailyAppointments", dailyAppointments)
  const interviewers = getInterviewersForDay(state, state.day)

  const schedule = dailyAppointments.map(appointment => {
    
    // console.log("interviewers", interviewers)
    // console.log("appointment", appointment)
    //console.log("interview in application", interview)
    return (
    <Appointment 
      {...appointment}  
      key = {appointment.id} 
      interview = {getInterview(state, appointment.interview)}
      id = {appointment.id}
      time = {appointment.time}
      interviewers = {interviewers}
      //interviewer = {appointment.interview ? interviewers[appointment.id].name : null}
    />
    );
    })

  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState({ ...state, days })
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('api/appointments'),
      axios.get('api/interviewers')
    ]).then(all => {
      //console.log(all)
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }))
    });
      //console.log(response.data);
      // setDays([...response.data])
      // setState({ ...state, days: response.data });
      //console.log(state)
    }, []);
    
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
            // setState={setState}
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
