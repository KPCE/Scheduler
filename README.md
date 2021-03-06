# Interview Scheduler

## About

Interview Scheduler is a single page app made with React, used for booking interviews for students for a given week.
It is thoroughly tested with Jest integration tests and Cypress end to end tests.

## Screenshots

!["Schedule example"](https://github.com/KPCE/Scheduler/blob/master/docs/schedule_example.png?raw=true)
!["Appointment form"](https://github.com/KPCE/Scheduler/blob/master/docs/appointment-form.png?raw=true)
!["Form error"](https://github.com/KPCE/Scheduler/blob/master/docs/form-error.png?raw=true)
!["Appointment confirm deletion"](https://github.com/KPCE/Scheduler/blob/master/docs/form-confirm-deletion.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

You will also need to clone the following directory https://github.com/lighthouse-labs/scheduler-api
and run the following command from a separate terminal open to that new directory

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test Framework

Please follow the README within the scheduler-api linked above to setup a local database for testing,
if you wish to run the Cypress tests included.

```sh
npm run storybook
```
