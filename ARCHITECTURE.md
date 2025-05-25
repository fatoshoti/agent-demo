# Morning Brew Cafe Website Architecture

## 1. Overview

This document outlines the high-level architecture for the "Morning Brew" cafe website, which will feature a homepage with a photo gallery, a contact page with an embedded Google Map, and a contact form.

## 2. Technology Stack

*   **Frontend:** Angular (TypeScript)
*   **Backend (API Service):** Node.js with Express.js (TypeScript)
*   **Web Server:** For serving the Angular frontend (can initially be integrated with the Node.js backend for simplicity, or a dedicated server like Nginx).
*   **Database:** (Initial Phase: File-based logging/no persistence for contact form; Future: MongoDB/PostgreSQL if persistent storage is required).

## 3. Application Components

### 3.1. Frontend Application

*   **Framework:** Angular
*   **Key Pages/Components:**
    *   **Homepage Component:** Displays a photo gallery with 6 static images.
    *   **Contact Page Component:** 
        *   Embeds a Google Maps iframe.
        *   Contains a responsive contact form.
*   **Functionality:**
    *   Client-side routing.
    *   Form validation.
    *   API integration for contact form submission.
    *   Responsive design.

### 3.2. Backend API Service

*   **Framework:** Node.js (Express.js)
*   **Key Endpoints:**
    *   `POST /api/contact`: Handles submissions from the contact form.
*   **Functionality:**
    *   Receives and validates contact form data.
    *   Currently, logs contact form data to the console/file. Future: Store in a database or send email.
    *   Handles Cross-Origin Resource Sharing (CORS).

## 4. API Contract

### 4.1. Contact Form Submission (POST /api/contact)

*   **Description:** Submits contact form data from the frontend.
*   **Request Body (JSON):**
    ```json
    {
      "name": "string",
      "email": "string (email format)",
      "subject": "string",
      "message": "string"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "status": "success",
      "message": "Contact form submitted successfully!"
    }
    ```
*   **Error Response (400 Bad Request / 500 Internal Server Error):**
    ```json
    {
      "status": "error",
      "message": "Error details..."
    }
    ```

## 5. Deployment Considerations

*   Separate deployment for Frontend and Backend services (e.g., Docker containers).
*   Web server to serve static frontend assets (e.g., Nginx, or integrated with Node.js backend).
*   CI/CD pipeline (to be defined by DevOps_agent).

## 6. Development Workflow

1.  **TL_agent:** Defines architecture and tasks.
2.  **Frontend_developer_agent:** Implements Angular application as per requirements.
3.  **Backend_developer_agent:** Develops Node.js API endpoints.
4.  **TL_agent:** Reviews pull requests, ensures alignment and quality.
5.  **DevOps_agent:** Manages infrastructure and deployment. 

This document will be updated as the project evolves.
