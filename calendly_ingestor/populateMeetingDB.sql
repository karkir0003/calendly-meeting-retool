-- uses JSON data from aggregateCalendlyMeetings step
WITH input_data AS (
    -- Parse the JSON array string into individual JSONB objects, then extract fields
    SELECT
        (item_data->>'event_id')::UUID AS event_id,
        (item_data->>'created_at')::TIMESTAMP WITH TIME ZONE AS created_at,
        (item_data->>'last_updated_at')::TIMESTAMP WITH TIME ZONE AS last_updated_at,
        (item_data->>'start_time')::TIMESTAMP WITH TIME ZONE AS start_time,
        (item_data->>'end_time')::TIMESTAMP WITH TIME ZONE AS end_time,
        (item_data->>'invitee')::VARCHAR(255) AS invitee,
        (item_data->>'invitee_email')::VARCHAR(255) AS invitee_email,
        (item_data->>'meeting_purpose')::TEXT AS meeting_purpose,
        (item_data->>'meeting_details')::TEXT AS meeting_details,
        (item_data->>'interview_date')::TEXT AS interview_date,
        (item_data->>'editor_link')::TEXT AS editor_link,
        (item_data->>'feedback_form_email_sent')::BOOLEAN AS feedback_from_email_sent,
        (item_data->>'feedback_form_email_timestamp')::TIMESTAMP WITH TIME ZONE AS feedback_form_email_timestamp
    FROM jsonb_array_elements( {{ aggregateCalendlyMeetings.data }} ) AS item_data

)
INSERT INTO calendly_meetings (
    event_id,
    created_at,
    last_updated_at,
    start_time,
    end_time,
    invitee,
    invitee_email,
    meeting_purpose,
    meeting_details,
    interview_date,
    editor_link
)
SELECT
    id.event_id,
    id.created_at,
    id.last_updated_at,
    id.start_time,
    id.end_time,
    id.invitee,
    id.invitee_email,
    id.meeting_purpose,
    id.meeting_details,
    id.interview_date,
    id.editor_link
FROM input_data id
ON CONFLICT (event_id) DO UPDATE SET
    -- On conflict, update these fields using values from the 'EXCLUDED' (new) record
    created_at = EXCLUDED.created_at,
    last_updated_at = EXCLUDED.last_updated_at,
    start_time = EXCLUDED.start_time,
    end_time = EXCLUDED.end_time,
    invitee = EXCLUDED.invitee,
    invitee_email = EXCLUDED.invitee_email,
    meeting_purpose = EXCLUDED.meeting_purpose,
    meeting_details = EXCLUDED.meeting_details,
    interview_date = EXCLUDED.interview_date,
    editor_link = EXCLUDED.editor_link;
