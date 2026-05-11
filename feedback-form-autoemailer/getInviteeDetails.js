const allEventsData = getEventIds.data;

const allInviteeDetails = [];

// In Retool workflow function block
async function getEventInvitees(eventId) {
  const response = await fetch(`https://api.calendly.com/scheduled_events/${eventId}/invitees`);
  if (!response.ok) {
     return {} // error, so fail open
  }
  const data = await response.json(); // stream response data
  return data;
}

// Retool Workflow Step itself
for (const eventId in allEventsData) {
  const response = await getEventInvitees(eventId);
  const inviteeData = response.data.collection[0]; //assume all meetings are 1:1

  //parse question and answer responses
  const questionsAndAnswers = inviteeData.questions_and_answers;
  const purposeOfMeeting = questionsAndAnswers[0]?.answer ?? null;
  const meetingDetails = questionsAndAnswers[1]?.answer ?? null;
  const interviewDate = questionsAndAnswers[2]?.answer ?? null;
  const editorLink = questionsAndAnswers[3]?.answer ?? null;
  
  allInviteeDetails.push({
    'eventId': eventId,
    'invitee': inviteeData.name,
    'invitee_email': inviteeData.email,
    'purposeOfMeeting': purposeOfMeeting,
    'meetingDetails': meetingDetails,
    'interviewDate': interviewDate,
    'editorLink': editorLink
  })
}

//convert the json to a mapping of event id --> data
const inviteeDetails = allInviteeDetails.reduce((acc, item) => {
  const eventId = item.eventId;
  acc[eventId] = item;
  return acc;
}, {});
return inviteeDetails;
