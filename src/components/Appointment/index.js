import React from "react";
import "./styles.scss"
// import Header from "./header"
import Show from "./Show"
import Empty from "./Empty"
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm"
import useVisualMode from "../../hooks/useVisualMode"



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    //console.log("props", props)
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  function deleteAppointment(interview) {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  }


  // const fake = []
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //console.log("this is what I'm looking for", props.interview)
  console.log("MODE: ", mode);
  return (
    <article className="appointment">
      <h2>{props.time}</h2>
        {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interviewer}/> : <Empty />} */}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SAVING && <Status message="Saving..." />}
        {mode === DELETING && <Status message="Deleting..." />}
        {mode === CONFIRM && 
          <Confirm 
          message="Are you sure you want to delete this appointment?" 
          onCancel={back}
          onConfirm={deleteAppointment}
          />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
          />
        )}
        {mode === CREATE && <Form onCancel= {() => back()} interviewers={props.interviewers} onSave={save} />}
    </article>
  )
}
