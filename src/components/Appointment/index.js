import React from "react";
import "./styles.scss"
import Header from "./header"
import Show from "./Show"
import Empty from "./Empty"


export default function Appointment(props) {
  return (
    <article className="appointment">
      <h2>{props.time}</h2>
        {props.interview ? <Show student={props.student} interviewer={props.interviewer}/> : <Empty />}

    </article>
  )
}