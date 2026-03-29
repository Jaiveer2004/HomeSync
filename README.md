# HomeSync - On-Demand Service Platform

**Tagline:** Seamless Home Services, Synchronized for You.

---

## 🔹 System Architecture & Overview

HomeSync is a comprehensive, full-stack marketplace engineered to bridge the gap between customers seeking reliable home services and skilled independent professionals. Modeled after industry-leading service platforms, HomeSync utilizes a highly scalable, modern tech stack integrated with artificial intelligence to optimize the user journey.

The system is logically partitioned into three core operational domains:
1.  **Client Portal:** A responsive interface empowering users to seamlessly discover, schedule, and execute secure payments for services.
2.  **Provider Dashboard:** A dedicated environment for service professionals to curate their offerings, manage their public profiles, and track active job queues.
3.  **Administrative Console:** A centralized control plane for system administrators to monitor platform health, manage users, and oversee marketplace transactions.

---

## ✨ Core Capabilities (MVP & Phase 2 Roadmap)

* **Robust Identity Management:** Secure, stateless user registration and authentication leveraging JSON Web Tokens (JWT).
* **Frictionless Provider Onboarding:** An optimized, multi-step registration pipeline for vetting and onboarding new service professionals.
* **Catalog Management:** Empowering partners with CRUD (Create, Read, Update, Delete) operations to dynamically manage their service catalogs.
* **Intelligent Service Discovery:** An intuitive, grid-based interface allowing clients to effortlessly browse and filter available services.
* **End-to-End Transactional Flow:** A meticulously designed user journey encompassing service selection, scheduling, and verified checkout.
* **Secure Financial Processing:** Enterprise-grade payment gateway integration via Razorpay, utilizing robust backend cryptographic signature verification to prevent tampering.
* **AI-Driven Concierge:** Integration with the Google Gemini API to provide a smart, conversational assistant that aids clients in pinpointing the exact service they require.
* **Dynamic Reputation System:** An automated feedback loop where client reviews seamlessly update provider ratings upon job completion.

---

## 🚀 Technology Stack

HomeSync is architected upon the MERN stack, heavily utilizing Next.js for server-side rendering and optimized frontend performance.

* **Client Environment:** Next.js 15 (App Router architecture), React 19, TypeScript for type safety, and Tailwind CSS for utility-first styling.
* **Server Environment:** Node.js 20 runtime executing Express.js 5.
* **Data Persistence:** MongoDB, utilizing Mongoose as the Object Data Modeling (ODM) layer.
* **Security & Auth:** JWT (JSON Web Tokens) for stateless session management.
* **Payment Gateway:** Razorpay.
* **Artificial Intelligence:** Google Gemini API.
* **Bidirectional Communication (Phase 2):** Socket.IO for real-time, event-driven data exchange.

---

## 📂 Repository Structure

To maintain a strict separation of concerns, the monorepo is divided into distinct frontend and backend directories.

### Backend Application (`homesync-backend`)
* `/src/config`: Centralized configuration for database connections and environment parsing.
* `/src/controllers`: Core business logic handling incoming HTTP requests and responses.
* `/src/middlewares`: Interceptors for request validation, authorization checks, and global exception handling.
* `/src/models`: Mongoose schema definitions representing the database entities.
* `/src/routes`: RESTful API endpoint declarations mapping URIs to specific controllers.
* `server.js`: The application bootstrap and server initialization script.

### Client Application (`homesync-frontend`)
* `/src/app`: Core page routing utilizing the Next.js App Router paradigm.
* `/src/components`: Modular, reusable React components strategically categorized by feature domain (`auth`, `chat`, `partner`) and generic UI elements (`ui`).
* `/src/context`: Global application state management (e.g., maintaining the Authentication lifecycle).
* `/src/lib`: Reusable utility classes and the centralized `axios` HTTP client configuration.

---

## ⚙️ Deployment & Local Setup

### System Prerequisites
* Node.js Engine (v20 or newer)
* Node Package Manager (npm)
* An active MongoDB instance (Local daemon or MongoDB Atlas cluster)
* Provisioned API keys for Razorpay and Google Gemini

### Backend Initialization
1.  Navigate into the API directory: `cd homesync-backend`
2.  Resolve project dependencies: `npm install`
3.  Establish a `.env` file at the root of the directory and configure your secrets:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_cryptographically_secure_jwt_secret
    RAZORPAY_KEY_ID=your_razorpay_test_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
    GEMINI_API_KEY=your_gemini_api_key
    ```
4.  Launch the development server: `npm run dev`

### Frontend Initialization
1.  Navigate into the client directory: `cd homesync-frontend`
2.  Resolve UI dependencies: `npm install`
3.  Establish a `.env.local` file to inject environment variables into the Next.js build:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000/api
    NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_test_key_id
    ```
4.  Launch the client development server: `npm run dev`