const calendlyResponse = historicalCalendlyEvents.data;

// Initialize an empty array to store the detailed event info
const eventDetailList = [];

// Check if 'collection' exists and is an array before processing
if (calendlyResponse && Array.isArray(calendlyResponse.collection)) {
  // Loop through each event in the collection
  for (const event of calendlyResponse.collection) {
    // Each event has a 'uri' like "https://api.calendly.com/scheduled_events/UUID"
    // We want to extract the UUID part.
    // Also, check if start_time and end_time exist, though they usually do for active events
    if (event.uri && event.start_time && event.end_time) {
      const uriParts = event.uri.split('/');
      const eventId = uriParts[uriParts.length - 1]; // The UUID is the last part of the URI

      // Push an object containing all the desired information
      eventDetailList.push({
        eventId: eventId,
        createdAt: event.created_at,
        lastUpdated: event.updated_at,
        startTime: event.start_time,
        endTime: event.end_time
      });
    }
  }
}

//convert the event details to a JSON mapping instead of array
const eventDetails = eventDetailList.reduce((acc, item) => {
  const eventId = item.eventId;
  acc[eventId] = item;
  return acc;
}, {});

return eventDetails;