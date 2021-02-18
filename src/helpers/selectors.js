import React, { useState, useEffect } from "react";
const axios = require('axios').default;

export function getAppointmentsForDay(state, day) {
  const appointments = [];
  if (!state.days.length) {
    return appointments;
  }
  
  const filteredDay = state.days.filter(dayz => dayz.name === day);
  // console.log(appointments)
  if (!filteredDay.length) {
    return appointments;
  }
  //console.log(filteredDay[0])
  filteredDay[0].appointments.forEach((appointment) => {
    appointments.push(state.appointments[appointment])
  })

  return appointments;
}

export function getInterview(state, interview) {
  const interviewData = {};
  if (interview === null) {
    return null;
  }

  interviewData.student = interview.student
  interviewData.interviewer = state.interviewers[interview.interviewer]

  return interviewData;

}