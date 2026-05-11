# Calendly Meeting Tracking System

## Problem Statement
I currently help students looking to break into software engineering by making time available for 1:1 conversations with me. Currently, students can schedule 1:1 consulting and mock technical interview sessions through my dedicated Calendly link. As the number of meetings grew, I lacked observability of a holistic overview of my meetings. Feedback is really important to me as I can help better serve future students who schedule 1:1 time with me.

## Current Behavior
After each session, feedback is collected manually by sending a Google Form link to the attendee. This process is time-consuming and prone to inconsistencies or delays.

## High Level Design
* Build an automated system to identify completed Calendly meetings and automatically send a personalized email to each attendee to request feedback by filling out a form
* Build an analytics portal for me to view the data and do analytical queries
* Current meeting volume: 10-20 meetings/month at peak

## Detailed Design
* Use [Retool](https://retool.com/) which is a low code/no code tool to build the analytics portal and automated feedback form system

### Automated Feedback Workflow
We can use Retool Workflows to build the automated workflow. Retool Workflows provides a rich interface to build a variety of business flows with a drag and drop environment. Our Retool workflow will be configured to run on a weekly basis. The following steps will be performed:

- Call the Calendly API to fetch the meetings that were completed within the last week
- Extract the attendee email from the meeting data
- Send an email notification to those accounts to request feedback via the Google Form

### Feedback Form
Use Retool Forms to create the feedback form

### Analytics Portal
Create Retool App to build the analytics portal which contains aggregate breakdown of the meetings with Summarize button to give an overview of my meetings


