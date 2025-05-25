# Morning Brew Frontend Application

This document provides instructions on how to set up and run the frontend Angular application for the Morning Brew Cafe website.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

*   Node.js (LTS version recommended)
*   npm (comes with Node.js)
*   Angular CLI: `npm install -g @angular/cli`

## 2. Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd morning-brew
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## 3. Running the Application

To start the development server, run the following command from within the `morning-brew` directory:

```bash
npm start
```

This will typically serve the application at `http://localhost:4200/`.

## 4. Running Tests

To run the unit tests, use the following command:

```bash
npm test
```

## 5. Building for Production

To build the application for production deployment, run:

```bash
npm run build
```

The built files will be located in the `dist/morning-brew` directory.
