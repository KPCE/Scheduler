import React from "react";
import "./styles.scss"
import Header from "./header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import useVisualMode from "../../hooks/useVisualMode"


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const fake = []
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //console.log("this is what I'm looking for", props.interview)
  return (
    <article className="appointment">
      <h2>{props.time}</h2>
        {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interviewer}/> : <Empty />} */}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            
          />
        )}
        {mode === CREATE && <Form onCancel= {() => back()} interviewers={props.interviewers} />}
    </article>
  )
}
