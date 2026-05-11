WITH input_data AS (
    -- Parse the JSON array string into individual JSONB objects, then extract fields
    SELECT
        (item_data->>'event_id')::UUID AS event_id,
        (item_data->>'sent')::BOOLEAN AS sent,
        (item_data->>'timestamp')::TIMESTAMP WITH TIME ZONE AS sent_timestamp
    FROM jsonb_array_elements( {{ generateReturn.data }} ) AS item_data

)
UPDATE calendly_meetings
SET
    feedback_form_email_sent = input_data.sent,
    feedback_form_email_timestamp = input_data.sent_timestamp
FROM
    input_data
WHERE
    calendly_meetings.event_id = input_data.event_id;