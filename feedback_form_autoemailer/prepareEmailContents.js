const meetings = getMeetingsFeedbackEmailUnsent.data;

const emailsToSend = [];

// IMPORTANT: Replace this with your actual feedback form URL.
const FEEDBACK_FORM_URL = "https://datasciencegt.retool.com/form/2264de5b-9cf1-4706-8651-0a068b1ff734";

for (const meeting of meetings) {
  const eventId = meeting.event_id;
  const meeting_date = new Date(meeting.start_time);
  const year = meeting_date.getFullYear();
  const month = String(meeting_date.getMonth() + 1).padStart(2, '0'); 
  const day = String(meeting_date.getDate()).padStart(2, '0');  
  const formattedDate = `${year}-${month}-${day}`;
  let emailBody = `
    <p>Hi ${meeting.invitee || 'there'},</p>
    <p>Thank you for taking the time to meet with Karthik!</p>
    <p>We'd love to hear your thoughts on our recent meeting on ${formattedDate}.</p>
  `;
  
  emailBody += `
    <p>I'd really appreciate it if you could take 5 minutes to fill out this feedback form :</p>
    <p><a href="${FEEDBACK_FORM_URL}">Provide Feedback Here</a></p>
    <p>Best regards,<br>Karthik</p>
  `;

  // Add each email's data to the array
  emailsToSend.push({
    eventId: eventId,
    to: meeting.invitee_email,
    subject: `Feedback Request for Your Meeting on ${new Date(meeting.end_time).toLocaleDateString()}`,
    html: emailBody, // Use 'html' for rich text emails
    eventId: meeting.event_id // Keep eventId here to mark as sent later
  });
}

return emailsToSend;