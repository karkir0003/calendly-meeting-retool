const response = email.data;

const statusCode = response.response.split(" ")[0];

const result = {
  "event_id": params.eventId,
  "recipient": params.recipient,
  "subject": params.subject,
};
if (statusCode == 250) {
  result.sent = true;
  result.timestamp = new Date();
} else {
  result.sent = false;
}
return JSON.stringify([result]);