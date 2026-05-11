const eventDataMap = getEventIds.data;

const inviteeDetailsMap = getInviteeDetails.data;

const finalRecordsForPostgres = [];
for (const eventId in eventDataMap) {
  if (eventDataMap.hasOwnProperty(eventId)) {
    const event = eventDataMap[eventId]; 
    const inviteeDetails = inviteeDetailsMap[eventId];
    if (inviteeDetails) {
      finalRecordsForPostgres.push({
        event_id: eventId, 
        created_at: event.createdAt || null,       
        last_updated_at: event.lastUpdated || null,
        start_time: event.startTime || null,
        end_time: event.endTime || null,
        invitee: inviteeDetails.invitee || null,
        invitee_email: inviteeDetails.invitee_email || null,
        meeting_purpose: inviteeDetails.purposeOfMeeting || null,
        meeting_details: inviteeDetails.meetingDetails || null,
        interview_date: inviteeDetails.interviewDate || null,
        //when ingesting an event, we didn't yet autosend the feedback form email, so populating defaults
        editor_link: inviteeDetails.editorLink || null,
        feedback_form_email_sent: false,
        feedback_form_email_timestamp: null
      });
    } else {
      continue;
    }
  }
}

return JSON.stringify(finalRecordsForPostgres);
