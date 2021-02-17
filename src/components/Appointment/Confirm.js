import React, { useState } from "react";
import Button from "components/Button";
import "./styles.scss"

//props:
// message:String eg. "Delete the appointment?"
// onConfirm:Function to be called when the user clicks the Confirm button
// onCancel:Function to be called when the user clicks the Cancel button

export default function Confirm(props) {

  const onConfirm = function() {

  }

  const onCancel = function() {

  }
  let message = "Delete the appointment?"

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button danger onClick={props.onConfirm}>Confirm</Button>
      </section>
    </main>
  )
}