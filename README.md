# Job Tracker Pro 🔍

Save, track, and manage your job applications directly from your browser.  
This Chrome extension streamlines your job hunt with one-click saving, smart autofill, and integrations that scale from simple tracking to AI-powered workflows.

- 🚀 Built with **Vanilla JavaScript + Chrome APIs**
- 🗂 Clean, minimal UI for popups + options
- 🔄 Supports CSV export + external integrations
- 🤖 Webhook system enables AI enrichment (Gemini, Grok)

## Key Features

- **One-Click Job Saving**: Quickly capture job title, company, and URL from the current page.  
- **Smart Autofill**: Automatically scrapes job details to save you time.  
- **Context Menu Integration**: Right-click to save a job instantly from any page or link.  
- **Centralized Dashboard**: View, manage, and delete applications directly from the extension popup.  
- **Resume Tracking**: Record which resume version was used for each application.  
- **Data Export**: Download your jobs as CSV for spreadsheets or reporting.  
- **Cross-Device Sync**: Data syncs across Chrome browsers where you’re logged in.  
- **Webhook Integration**: Send saved jobs to Google Sheets, Notion, Airtable, or a custom backend.  
- **AI Enrichment via Webhooks**: Use external services (e.g. Gemini, Grok) to summarize job posts, extract skills, and suggest resume keywords.  


## Tech Stack
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![HTML](https://img.shields.io/badge/HTML5-orange)
![CSS](https://img.shields.io/badge/CSS3-blue)
![Chrome Extension](https://img.shields.io/badge/Chrome--Extension-lightgrey)


## Getting Started

### Installation
1. Clone or download this repository.  
```bash
git clone https://github.com/nikkiakali/chrome-job-tracker.git
cd chrome-job-tracker
```
2. Open Chrome and navigate to chrome://extensions/.
3. Enable Developer Mode (toggle in the top right).
4. Click Load unpacked and select the repo’s root folder.
5. The Job Tracker Pro icon will appear in your extensions bar.

## How to Use

### Saving a Job
1.  Navigate to a job posting you're interested in.
2.  Click the **Job Tracker Pro** icon in your browser toolbar.
3.  The form will be pre-filled with information scraped from the page.
4.  Fill in any additional details (like status or notes) and click **Save**.

### Viewing and Managing Jobs
1. Click the extension icon → **View Saved**.  
2. Open job URLs or delete entries directly from the list.  

## Configuration
Right-click the extension icon → Options (or click Settings in the popup).

### Resume Variants
- Add resume versions (e.g., General, SWE-Focused).
- These appear in the Resume Used dropdown when saving jobs.

### Webhook URL
Provide a webhook URL to send job data as a POST request.
Examples:
-   Add rows to Google Sheets
-   Create entries in Notion or Airtable
-   Trigger workflows in Zapier/Make
-   Connect to AI services

## AI Integration via Webhooks

Use webhooks to enrich saved job data with AI services like Google’s Gemini or xAI’s Grok.
You don’t enter API keys directly into the extension. Instead, set up a backend (e.g. Google Apps Script, Vercel, Netlify) to receive the job data and call AI APIs.

### Example Workflow

1. **Extension Sends Data** → Job details (title, company, URL, notes) sent to your webhook.  
2. **Your Service Receives Data** → Backend (e.g. Apps Script) processes payload.  
3. **AI Enrichment** → Call AI API to:  
   - Summarize the job description  
   - Extract skills/requirements  
   - Suggest resume keywords  
4. **Store Enriched Data** → Save enriched job data in Google Sheets, Airtable, or Notion.  

This setup gives you complete control and flexibility to build powerful, AI-driven job tracking workflows.

## What’s Next
- Filtering & sorting by status, company, or date
- Notifications for follow-ups
- Chrome sync for better cross-device support
- Dark mode + UI polish

## About
Built by [Natasha Akali](https://github.com/nikkiakali) — turning ideas into products that help people.
