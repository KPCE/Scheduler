import React from "react";
import "./styles.scss"
import Header from "./header"
import Show from "./Show"
import Empty from "./Empty"


export default function Appointment(props) {
  console.log("this is what I'm looking for", props)
  return (
    <article className="appointment">
      <h2>{props.time}</h2>
        {props.interview ? <Show student={props.interview.student} interviewer={props.interviewer}/> : <Empty />}

    </article>
  )
}