/**
We need to annoyingly add these extra zeros to the date for getting calendly API to work

See this forum: https://community.calendly.com/api-webhook-help-61/serious-issue-in-list-events-endpoint-page-token-is-not-working-811
*/

return {
    calendly_max_start_time: "2025-05-27T00:00:00.000000Z"
  };