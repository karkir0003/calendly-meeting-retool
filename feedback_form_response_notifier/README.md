# Feedback Form Response Notififer

Source code for the Feedback Form Response Notifier workflow

## Workflow Trigger
On Form Submit

## DAG

<img width="853" height="134" alt="Screenshot 2026-05-11 at 11 38 51 AM" src="https://github.com/user-attachments/assets/a9edfc77-9375-42f4-912b-7e7e74166dfd" />


<details>
  <summary>View Mermaid</summary>

  ```mermaid
graph LR
    %% Node Definitions
    Start([⚡ on feedback submit])
    
    SendEmail(query send_retool_email)
    
    SMTP{{📧 Email Service}}

    %% Workflow Connections
    Start --> SendEmail
    SendEmail -.-> SMTP

    %% Retool-specific Styling
    style Start fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#065f46
    style SendEmail fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#6b21a8
    
    %% External Service Styling
    style SMTP fill:#ffffff,stroke:#333,stroke-dasharray: 5 5,color:#333

    %% Legend-like spacing
    classDef default font-family:sans-serif,font-size:12px;
```

</details>
