import React from "react";
import className from "classnames";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"

//props
// interviewers:array - an array of objects containing the information of each interviewer
// interviewer:number - the id of an interviewer
// setInterviewer:function - a function that accepts an interviewer id

// children props:
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection

export default function InterviewerList(props) {
  const interviewerList = props.interviewers.map(value => (
    <InterviewerListItem 
      key = {value.id}
      name={value.name} 
      selected={value.id === props.interviewer}
      avatar={value.avatar}
      onChange={(event) => props.onChange(value.id)}  
      />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">{props.name}</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
}