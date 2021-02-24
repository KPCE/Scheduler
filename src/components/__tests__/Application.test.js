import React from "react";

import { render, cleanup, waitForElement, queryByText, getByTestId } from "@testing-library/react";

import Application from "components/Application";
import { fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react/dist";
import axios from "axios";

afterEach(cleanup);


describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText, click } = render(<Application />);
    await waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
    
  });

  it("Loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    //console.log(prettyDOM(container))
    //expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    const appointments = getAllByTestId(container, "appointment");
    //console.log(prettyDOM(appointments));
    const appointment = appointments[0];//getAllByTestId(container, "appointment")[0]
    //console.log(prettyDOM(appointment))
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))


    fireEvent.click(getByText(appointment, "Save"));
    //debug()
    //console.log(prettyDOM(appointment));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument()
    expect(getByAltText(appointment, "Edit")).toBeInTheDocument()
    expect(getByAltText(appointment, "Delete")).toBeInTheDocument()
    //debug()

    
    //console.log(prettyDOM(day))
    await waitForElement(() => getByText(day, "no spots remaining"))
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

  // 1. render the Application
  const { container, debug } = render(<Application />);
  // 2. wait until text "archie cohen is displayed"
  await waitForElement(() => getByText(container, "Archie Cohen"))
  //console.log(prettyDOM(container))
  // 3. find delete button for archie's appointment and click it
  const appointment = getAllByTestId(container, "appointment")[1]
  //console.log(prettyDOM(appointment))
  fireEvent.click(getByAltText(appointment, "Delete"))
  // 3a. check confirmation page is shown
  expect(getByText(appointment, "Confirm")).toBeInTheDocument()
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument()
  // 3b. click confirm button
  fireEvent.click(getByText(appointment, "Confirm"))
  // 4. check that the element with "Deleting" is displayed
  expect(getByText(appointment, "Deleting...")).toBeInTheDocument()
  // 5. wait until element with "add" button is displayed
  await waitForElement(() => getByAltText(appointment, "Add"))
  // 6. check there is no element with "archie cohen" to query for
  expect(queryByText(container, "Archie Cohen")).toBe(null)
  // 7. check that the daylistitem with the text "Monday" also has text "2 spots remaining"
  const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    // We want to start by finding an existing interview.
    const appointment = getAllByTestId(container, "appointment")[1]
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // With the existing interview we want to find the edit button.
    fireEvent.click(getByAltText(appointment, "Edit"))
    //console.log(prettyDOM(appointment))
    // We change the name and save the interview.
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    // We don't want the spots to change for "Monday", since this is an edit.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument()
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // Read the errors because sometimes they say that await cannot be outside of an async function.

  })
  
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"))
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    //console.log(prettyDOM(container))
    //expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    const appointments = getAllByTestId(container, "appointment");
    //console.log(prettyDOM(appointments));
    const appointment = appointments[0];//getAllByTestId(container, "appointment")[0]
    //console.log(prettyDOM(appointment))
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))


    fireEvent.click(getByText(appointment, "Save"));
    //debug()
    //console.log(prettyDOM(appointment));
    expect(getByText(appointment, "Saving...")).toBeInTheDocument()
    await waitForElement(() => getByText(appointment, "Error"));
    expect(getByText(appointment, "Could not save or delete appointment, please try again")).toBeInTheDocument()
    fireEvent.click(getByAltText(appointment, "Close"))
    await waitForElement(() => getByText(container, "Save"))
    expect(getByPlaceholderText(appointment, "Enter Student Name")).toBeInTheDocument()
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. render the Application
  const { container, debug } = render(<Application />);
  // 2. wait until text "archie cohen is displayed"
  await waitForElement(() => getByText(container, "Archie Cohen"))
  //console.log(prettyDOM(container))
  // 3. find delete button for archie's appointment and click it
  const appointment = getAllByTestId(container, "appointment")[1]
  //console.log(prettyDOM(appointment))
  fireEvent.click(getByAltText(appointment, "Delete"))
  // 3a. check confirmation page is shown
  expect(getByText(appointment, "Confirm")).toBeInTheDocument()
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument()
  // 3b. click confirm button
  fireEvent.click(getByText(appointment, "Confirm"))
  // 4. check that the element with "Deleting" is displayed
  expect(getByText(appointment, "Deleting...")).toBeInTheDocument()
  // 5. wait until element with "add" button is displayed
  await waitForElement(() => getByText(appointment, "Error"))
  expect(getByText(appointment, "Could not save or delete appointment, please try again")).toBeInTheDocument()
  fireEvent.click(getByAltText(appointment, "Close"))
  await waitForElement(() => getByText(container, "Archie Cohen"))
  expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument()
  });
});