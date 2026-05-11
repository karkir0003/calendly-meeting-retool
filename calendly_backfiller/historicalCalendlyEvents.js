// In Retool function block
async function getHistoricalCalendlyEvents(calendly_max_start_time, next_page_token) {
    const params = new URLSearchParams({
        user: 'https://api.calendly.com/users/<user_id_here>',
        status: 'active',
        max_start_time: calendly_max_start_time,
        ...(next_page_token && { page_token: next_page_token })
    });

    const res = await fetch(`https://api.calendly.com/scheduled_events?${params}`);
    return res.ok ? res.json() : {};
}

// ---- Retool Workflow Step -------

//Create an empty array to store the results from API calls
const result = [];

//Call the callAPI function for the first page
let response = await getHistoricalCalendlyEvents(time_window.data.calendly_max_start_time, "");

//Store the response in the results array
for(let i=0; i<response.data.collection.length; i++){
  result.push(response.data.collection[i]);
}

//Does the response indicate more data
while (response.data.pagination.next_page_token){
  let next_page_token = response.data.pagination.next_page_token;
  response = await getHistoricalCalendlyEvents(time_window.data.calendly_max_start_time, next_page_token);

  for(let i=0; i<response.data.collection.length; i++){
    result.push(response.data.collection[i]);
  }
}

return {'collection': result}