# Feedback Form Autoemailer

Source code for the Feedback Form Autoemailer workflow

## Workflow Trigger
Trigger at 10AM PDT every day

## DAG

<img width="853" height="166" alt="Screenshot 2026-05-11 at 11 13 58 AM" src="https://github.com/user-attachments/assets/fe95ed4d-8dd0-46e7-a6b0-345756e0977f" />


<details>
  <summary>View Mermaid</summary>

  ```mermaid
graph LR
    %% Main Workflow Nodes
    Start([⚡ trigger])
    GetUnsent(query getMeetingsFeedbackEmailUnsent)
    PrepEmail{{js prepareEmailContents}}

    %% Loop Subgraph with specific label
    subgraph Loop [send email loop]
        direction LR
        EmailCall(query retool_email)
        GenReturn{{js generateReturn}}
        UpdateDB[(db update calendly_meetings)]
        
        EmailCall --> GenReturn
        GenReturn --> UpdateDB
    end

    %% External System
    SMTP{{📧 Email Service}}

    %% Main Connections
    Start --> GetUnsent
    GetUnsent --> PrepEmail
    PrepEmail --> Loop

    %% External Interaction
    EmailCall -.-> SMTP

    %% Retool-specific Styling
    style Start fill:#ecfdf5,stroke:#10b981,stroke-width:2px,color:#065f46
    style GetUnsent fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#6b21a8
    style PrepEmail fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e40af
    
    %% Loop Box Styling
    style Loop fill:#f8fafc,stroke:#64748b,stroke-dasharray: 5 5,color:#334155
    
    %% Internal Loop Node Styling
    style EmailCall fill:#faf5ff,stroke:#a855f7,stroke-width:2px,color:#6b21a8
    style GenReturn fill:#eff6ff,stroke:#3b82f6,stroke-width:2px,color:#1e40af
    style UpdateDB fill:#fff7ed,stroke:#f97316,stroke-width:2px,color:#9a3412
    
    %% External Service Styling
    style SMTP fill:#ffffff,stroke:#333,stroke-dasharray: 5 5,color:#333
```

</details>
