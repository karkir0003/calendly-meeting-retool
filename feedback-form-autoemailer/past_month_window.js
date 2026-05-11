let nowUtc = new Date().toISOString();

let thirtyDaysAgo = new Date(); 
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30); 
thirtyDaysAgo.setUTCHours(0, 0, 0, 0);
let thirtyDaysAgoUtcStart = thirtyDaysAgo.toISOString();

// Return these values so they can be used in subsequent steps
return {
  calendly_min_start_time: thirtyDaysAgoUtcStart,
  calendly_max_start_time: nowUtc
};
