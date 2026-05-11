# Calendly Ingestor

Source code for the Calendly Ingestor Workflow

## Workflow Trigger
Trigger at 9AM PDT every day

## DAG
<img width="1303" height="166" alt="Screenshot 2026-05-11 at 10 24 28 AM" src="https://github.com/user-attachments/assets/1d3177fe-f352-4c82-8577-18280f00b0a5" />

<details>
  <summary>View Mermaid</summary>

  ```mermaid
  graph LR
    %% Node Definitions
    Start([⚡ startTrigger]) 
    Window{{js pastMonthWindow}}
    Events(query getActiveEvents)
    IDs{{js getEventIds}}
    Invitee(query getInviteeDetails)
    Aggregate{{js aggregateCalendlyMeetings}}
    DB[(db populateMeetingDB)]
    
    %% External System
    API{{☁️ Calendly API}}

    %% Main Workflow Connections (Solid)
    Start --> Window
    Window --> Events
    Events --> IDs
    IDs --> Invitee
    Invitee --> Aggregate
    Aggregate --> DB

    %% External API Calls (Dotted)
    Events -.-> API
    Invitee -.-> API

    %% Retool-specific Styling
    style Start fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#065f46
    style Window fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e40af
    style Events fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#6b21a8
    style IDs fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e40af
    style Invitee fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#6b21a8
    style Aggregate fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e40af
    style DB fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#9a3412
    
    %% Calendly Styling
    style API fill:#ffffff,stroke:#333,stroke-dasharray: 5 5,color:#333
```

</details>