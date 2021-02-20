import React, { useState, useEffect } from "react";
const axios = require('axios').default;

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
function bookInterview(id, interview) {
  //console.log(id, interview);
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const url = `/api/appointments/${id}`;
  return axios.put(url, appointment)
    .then(() => setState({...state, appointments}));
}

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const url = `/api/appointments/${id}`;
  return axios.delete(url, appointment)
    .then(() => setState({...state, appointments}));

}






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


  return {state, setDay, bookInterview, cancelInterview};
};