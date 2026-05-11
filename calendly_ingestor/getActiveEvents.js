async function getActiveEvents(minStart, minEnd) {
    const response = await fetch(`https://api.calendly.com/users/scheduled_events?user=https://api.calendly.com/users/<your user id here>&min_start_time=${minStart}}&status=active&max_start_time=${maxEnd}`)
    if (!response.ok) {
        return {} // error, so fail open
     }
     const data = await response.json(); // stream response data
     return data;
}