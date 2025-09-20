# Job Tracker Pro

Job Tracker Pro is a powerful Chrome extension designed to streamline your job application process. Save, track, and manage your job applications directly from your browser with ease.

## Key Features

-   **One-Click Job Saving**: Quickly save job application details like title, company, and URL directly from your browser.
-   **Smart Auto-fill**: Automatically populates job title, company, and URL from the current page to save you time.
-   **Context Menu Integration**: Right-click on any page, link, or selected text to instantly save a job application.
-   **Centralized Dashboard**: View and manage all your saved jobs in a clean, accessible list within the extension popup.
-   **Data Export**: Download all your saved job data as a CSV file for use in spreadsheets or other tools.
-   **Powerful Webhook Integration**: Connect to external services like Google Sheets, Notion, or Airtable. Unleash advanced workflows by integrating with AI services like Gemini or Grok.
-   **Resume Tracking**: Keep a record of which resume version you used for each application.
-   **Cross-Device Sync**: Your job list is automatically synced across all browsers where you are logged into your Google account.

## Installation

1.  Download the extension files to your local machine.
2.  Open the Chrome browser and navigate to `chrome://extensions`.
3.  Enable "Developer mode" using the toggle in the top right corner.
4.  Click the "Load unpacked" button and select the extension's root folder.
5.  The **Job Tracker Pro** icon will appear in your extensions bar.

## How to Use

### Saving a Job
1.  Navigate to a job posting you're interested in.
2.  Click the **Job Tracker Pro** icon in your browser toolbar.
3.  The form will be pre-filled with information scraped from the page.
4.  Fill in any additional details (like status or notes) and click **Save**.

Alternatively, you can right-click anywhere on the page (or on a link to a job posting) and select **"Save job to tracker"** from the context menu for even faster saving.

### Viewing and Managing Jobs
1.  Click the extension icon to open the popup.
2.  Click the **"View Saved"** button to see a list of all your applications.
3.  From the list, you can open the original job posting URL or delete an entry.

## Configuration

To configure the extension, right-click the extension icon and select "Options", or click the "Settings" link in the popup.

### Resume Variants
In the settings, you can list the different versions of your resume (e.g., "General", "Software Engineering Focused"). This list will populate the "Resume Used" dropdown in the save form, helping you track which resume you've sent for each application.

### Webhook URL
This is where the magic happens for automation and integration. By providing a webhook URL, the extension will send the details of every saved job as a `POST` request to your endpoint. This allows you to:
-   Automatically add jobs to a Google Sheet.
-   Create new entries in a Notion or Airtable database.
-   Trigger custom workflows and connect to AI services.

## AI Integration via Webhooks

Leverage the power of AI to enrich your job application data. The webhook feature is your gateway to connecting Job Tracker Pro with powerful AI models like Google's Gemini or xAI's Grok.

While you don't enter API keys directly into the extension, you can set up a simple backend service (like a Google Apps Script or a serverless function on Vercel/Netlify) to act as your webhook endpoint. This service can use your AI API keys to process and enhance the job data.

### Example Workflow

1.  **Extension Sends Data**: When you save a job, the extension sends the job details (title, company, URL, etc.) to your configured webhook URL.
2.  **Your Service Receives Data**: Your backend service (e.g., a Google Apps Script) receives this data.
3.  **AI Enrichment**: Your service then calls an AI API (like Gemini). For example, you could ask the AI to:
    -   Summarize the job description from the URL.
    -   Extract key skills and requirements from the job post.
    -   Suggest keywords to include in your resume.
4.  **Store Enriched Data**: Finally, your service stores the original job data along with the AI-generated insights into your preferred database, like a Google Sheet, Airtable, or Notion page.

This setup gives you complete control and flexibility to build powerful, AI-driven job tracking workflows.
