import React, { useState, useEffect } from "react";
const axios = require('axios').default;

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  
// function updateSpots() {


//   axios.get('/api/days')
//   .then((values) => {
//     setState(prev => ({
//       ...prev,
//       days: values.data
//     }))
//   })
// }




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
  const updatedDays = state.days.map((day) => {
    if (day.appointments.includes(id)) {

      const appointmentz = state.appointments[id]

      if (appointmentz.interview === null && appointmentz.id === id) {
        return {...day, spots: day.spots - 1}
      } else {
        return {...day}
      }
    } else {
      return {...day}
    }
  }) 

  const url = `/api/appointments/${id}`;
  return axios.put(url, appointment)
    .then(() => setState({...state, appointments, days: updatedDays}))
    // .then(() => {
    //   updateSpots()
    // });
};

function cancelInterview(id) {
  const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  const updatedDays = state.days.map((day) => {
    if (day.appointments.includes(id)) {
      return {...day, spots: day.spots + 1}
    } else {
      return day
    }
  })


  const url = `/api/appointments/${id}`;
  return axios.delete(url, appointment)
    .then(() => setState({...state, appointments, days: updatedDays}))
    // .then(() => updateSpots());

};


//{"1":{"id":1,"time":"12pm","interview":null},"2":{"id":2,"time":"1pm","interview":null},"3":{"id":3,"time":"2pm","interview":{"student":"Jaime Reuss","interviewer":5}},"4":{"id":4,"time":"3pm","interview":{"student":"Archie Cohen","interviewer":9}},"5":{"id":5,"time":"4pm","interview":null},"6":{"id":6,"time":"12pm","interview":{"student":"Chad Takahashi","interviewer":9}},"7":{"id":7,"time":"1pm","interview":null},"8":{"id":8,"time":"2pm","interview":null},"9":{"id":9,"time":"3pm","interview":{"student":"Jamal Jordan","interviewer":6}},"10":{"id":10,"time":"4pm","interview":{"student":"Leopold Silvers","interviewer":6}},"11":{"id":11,"time":"12pm","interview":{"student":"Liam Martinez","interviewer":5}},"12":{"id":12,"time":"1pm","interview":{"student":"Lydia Miller-Jones","interviewer":5}},"13":{"id":13,"time":"2pm","interview":{"student":"Maria Boucher","interviewer":3}},"14":{"id":14,"time":"3pm","interview":null},"15":{"id":15,"time":"4pm","interview":null},"16":{"id":16,"time":"12pm","interview":null},"17":{"id":17,"time":"1pm","interview":{"student":"Michael Chan-Montoya","interviewer":3}},"18":{"id":18,"time":"2pm","interview":{"student":"Allegra Scrugham","interviewer":5}},"19":{"id":19,"time":"3pm","interview":null},"20":{"id":20,"time":"4pm","interview":{"student":"Richard Wong","interviewer":9}},"21":{"id":21,"time":"12pm","interview":null},"22":{"id":22,"time":"1pm","interview":{"student":"Yuko Smith","interviewer":3}},"23":{"id":23,"time":"2pm","interview":null},"24":{"id":24,"time":"3pm","interview":null},"25":{"id":25,"time":"4pm","interview":null}}



const setDay = day => setState({ ...state, day });
//const setDays = days => setState({ ...state, days })
// const setDays = days => setState(prev => ({ ...prev, days }));

useEffect(() => {
  Promise.all([
    axios.get('/api/days'),
    axios.get('/api/appointments'),
    axios.get('/api/interviewers')
  ]).then(all => {
    // console.log(all)
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







// const updateSpots = function (day, days, appointments) {
//   const dayObj = days.filter(dayElement => dayElement.name === day); 
//   const spots = dayObj[0].appointments.filter(e => appointments[e].interview === null).length;
//   const newDayObj = { ...dayObj[0], spots }
//   const newArray =  days.map(item => item.name === day ? newDayObj : item);
//   return newArray;
// };

// case SET_INTERVIEW: { 
//   const appointment = {
//     ...state.appointments[id],
//     interview: interview && { ...interview }
//   };
//   const appointments = {
//     ...state.appointments,
//     [id]: appointment
//   };
//   const days = updateSpots(state.day, state.days, appointments);

//   return { ...state, appointments, days };
// }


// books a new interview
// function bookInterview(id, interview) {
//   return axios.put(`/api/appointments/${id}`, { interview })
//   .then(() => {
//     dispatch({ type: SET_INTERVIEW, id, interview });
//     // updateSpots();
//   })
// }

// // cancels an interview
// function cancelInterview(id) {
//   return axios.delete(`/api/appointments/${id}`)
//   .then(() => {
//     dispatch({ type: SET_INTERVIEW, id, interview: null });
//     // updateSpots();
//   })
// }