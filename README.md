# Calendly Meeting Tracking System

Design Doc: [Here](https://www.notion.so/karthik-subramanian/Calendly-Meetings-Automated-Feedback-Workflow-11d705ac0fb7806b806fd11e2fffff77?source=copy_link)

## Problem Statement
I currently help students looking to break into software engineering by making time available for 1:1 conversations with me. Currently, students can schedule 1:1 consulting and mock technical interview sessions through my dedicated Calendly link. As the number of meetings grew, I lacked observability of a holistic overview of my meetings. Feedback is really important to me as I can help better serve future students who schedule 1:1 time with me.

## Current Behavior
After each session, feedback is collected manually by sending a Google Form link to the attendee. This process is time-consuming and prone to inconsistencies or delays.

## High Level Design
* Build an automated system to identify completed Calendly meetings and automatically send a personalized email to each attendee to request feedback by filling out a form
* Build an analytics portal for me to view the data and do analytical queries
* Current meeting volume: 10-20 meetings/month at peak

See the high level architecture diagram of the the workflow at a high level
<img width="1390" height="775" alt="image (1)" src="https://github.com/user-attachments/assets/cdbc41a2-590b-427f-a2ca-fe98c33bcb3f" />

High level architecture diagram of the feedback form:
<img width="1443" height="625" alt="image (2)" src="https://github.com/user-attachments/assets/a0d446c2-492b-4051-8af3-3b18bfdc0a64" />

## Detailed Design
* Use [Retool](https://retool.com/) which is a low code/no code tool to build the analytics portal and automated feedback form system
* Use Retool Database (Postgres) to store calendly meetings and feedback form responses. The two tables will be:
   a. `calendly_meeitngs`: Stores the scraped Calendly meetings for any analytics in Postgres database
   b. `feedback_form_responses`: Stores the feedback form responses
* Create a Retool workflow called `calendly_ingestor`  that scrapes Calendly API to get the meetings within the past 30 days and writes to a database table called `calendly_meetings`

* Create a Retool workflow `feedback_form_autoemailer` that runs each day after `calendly_ingestor` workflow finishes. We add a one hour gap. This workflow looks for meetings where feedback form email wasn't sent and call Retool Email to send the feedback form email

* Create feedback in Retool and pipe the submissions to `feedback_form_responses`
* Create a Retool API resource called `calendly_api` as per this [guide](https://docs.retool.com/queries/guides/api/rest). Note that you'll need an authorization token from Calendly Developer Portal . Whenever we want to call the Calendly API, we will use the API resource as an abstraction layer

**Why Retool**
- The app is relatively simple and Retool provides a nice low-code/no-code interface
- Personal learning: I used Retool in a previous job and was amazed by its simplicity and rich functionality. I wanted to apply my learnings to a reasonably scoped problem in my personal life
- Generous Free Tier for the current scale: 500 workflow runs/month, 50 emails/day via Retool Email. Our volume of meetings per day is far less than Retool's threshold, so it should suffice for the current scale
- The volume of data I'm working with is relatively low and Retool's free version fits my current use case
- No need to worry about dependency management and access control compared to building this app on my own  

**Tradeoffs and Risks**
* If meeting demand grows, increased risk of hitting the free tier limit and need to pivot to another platform or build the app myself
* Dependence on Retool. High bus factor 
* Dependence on Calendly API. The current rate limit for the free plan is 50 requests/user/minute. If we need to make the workflow more frequent, likelihood of 429 rate limit exceeds error would increase

### Calendly Ingestor Workflow
We will use Retool Workflows to build the automated workflow that scrapes the Calendly API to get meetings within the past 30 days and persists to the database! See `calendly_ingestor/` for the code and detailed diagram

This workflow runs on a daily basis.

### Feedback Form Autoemailer
We will build another Retool workflow to look at the `calendly_meetings` table and look for meetings where feedback form email wasn't sent. We will send emails via Retool Email

See `feedback_form_autoemailer/` for the code and detailed diagram

This workflow runs on a daily basis

### Calendly Backfiller
In the event that `calendly_ingestor` fails its daily run, `calendly_backfiller` can scrape the calendly API from the earliest calendly meeting to now (no last 30 day window) and upsert any data that's not present in `calendly_meetings`. The `feedback_form_autoemailer` daily workflow run would send feedback form emails to the invitees of the backfilled meetings.

This is a manually triggered workflow in case we suspect any missing data.

### Feedback Form
Use Retool Forms to create the feedback form and pipe responses to `feedback_form_responses` table

### Analytics Portal
Create Retool App to build the analytics portal which contains aggregate breakdown of the meetings with Summarize button to give an overview of my meetings

### Storage Layer
Create Retool Database to store past Calendly meetings and feedback form responses. This database is managed postgres table under the hood. 
