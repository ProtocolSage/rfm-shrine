# Recursive Fractal Mind - Project To-Do List

This document outlines the to-do items for the Recursive Fractal Mind project, categorized by priority and project phase.

**I. Critical Phase III Fixes & Completions (Highest Priority)**

*   **A. Authentication & User Data:**
    1.  **Implement Database for Users:** Migrate user storage from in-memory `Map` to a persistent database (e.g., PostgreSQL, MongoDB).
    2.  **Implement Database for Invite Codes:** Migrate invite code storage from in-memory `Set` to the chosen database, including schema for code, expiry, and usage status.
    3.  **Implement Password Hashing for New Users:** Add proper password hashing (e.g., `bcrypt.hash`) during user registration in `pages/api/auth/[...nextauth].ts`.
    4.  **User `joinedDate`:** Store and display `createdAt`/`joinedDate` for users in their profile.
    5.  **Implement "Save Changes" (Profile Update):** Create an API endpoint and implement UI functionality for users to update their display name.
    6.  **Implement "Change Password":** Design and implement a secure API endpoint and UI flow for users to change their password.

*   **B. Memory System & Security:**
    1.  **Secure Memory Storage:** Migrate memory storage from `public/memory/` (file system) to the database. Each memory must be associated with a `userId`.
    2.  **Update RFM Interaction Saving:** Modify the `/api/rfm` endpoint (or wherever interactions are saved) to store memories in the database, linked to the `userId`.
    3.  **Update `/api/memory` Endpoint:** Refactor to fetch memories specifically for the logged-in user from the database. Address public vs. private memory distinction if applicable.
    4.  **Display User-Specific Memory Count:** Ensure the profile page fetches and displays the count of memories belonging only to the logged-in user.

*   **C. Stripe Monetization (Essential for Premium Features):**
    1.  **Implement Stripe Checkout:** Fully implement `pages/api/checkout.ts` using the Stripe Node.js library to create real checkout sessions (define line items, success/cancel URLs, customer creation/retrieval).
    2.  **Implement Stripe Webhook Handler:** In `pages/api/webhooks/stripe.ts`, implement robust webhook processing:
        *   Verify webhook signatures.
        *   Handle `checkout.session.completed`: Store Stripe customer ID, subscription ID, and update user's role/status to premium in the database.
        *   Handle `invoice.payment_succeeded`, `customer.subscription.deleted`, `invoice.payment_failed` to manage ongoing subscription status.
    3.  **Update Subscription Page UI:** Modify `pages/subscribe/index.tsx` to call `/api/checkout` and redirect users to the actual Stripe Checkout.
    4.  **User Model Update for Stripe:** Add fields like `stripeCustomerId`, `stripeSubscriptionId`, `subscriptionStatus`, `subscriptionTier` to the user model in the database.
    5.  **Populate `hasSubscription` Correctly in Session:** Ensure `session.user` object (via `next-auth` callbacks) accurately reflects the user's subscription status from the database.
    6.  **Implement "Manage Subscription" Button:** Redirect users to the Stripe Customer Portal for managing their subscriptions.

*   **D. Premium Feature Access Control (Depends on C):**
    1.  **Private Reflection Access:** In `pages/reflect/index.tsx`, implement checks (server-side or client-side with API validation) to ensure only subscribed users can access the private reflection features.
    2.  **Memory Export Access:** In `pages/api/export-memory.ts`, uncomment and fully implement the subscription check using the user's status from the database. Ensure exports are user-specific from database.
    3.  **Implement "Save Reflection" Functionality:** Create an API endpoint and database schema to allow premium users to save their generated reflections.

**II. Foundational Phase IV Features (High Priority - after I)**

*   **A. Vector Search Across Memory Archive:**
    1.  **Embedding Generation:** Choose an embedding model and implement a process to generate and store embeddings for user memories (from the database).
    2.  **Vector Database Setup:** Select and integrate a vector database.
    3.  **Search API Endpoint:** Create an API to perform semantic search over user's memories using query embeddings.
    4.  **UI Integration:** Add a search bar to the memory archive/reflection pages.

*   **B. GPT Fine-tuning on Memory Logs (Core Self-Evolution):**
    1.  **Data Preparation Pipeline:** Secure and privacy-preserving process to format user memory logs for fine-tuning (consent required).
    2.  **Fine-tuning Process & Management:** Scripts for OpenAI (or other) fine-tuning APIs, model versioning.
    3.  **Fine-tuned Model Integration:** Allow `/api/rfm` to use fine-tuned models (user-specific or general).

*   **C. Daily Recursive Summaries:**
    1.  **Summary Logic Design:** Prompts and system for generating daily summaries of user interactions.
    2.  **Scheduling & Execution:** CRON job or serverless function for daily execution per opted-in user.
    3.  **Storage & Presentation:** Store summaries in DB, decide on UI/email delivery.
    4.  **User Opt-in/Opt-out:** Setting for users to manage this feature.

**III. Enhancements & Advanced Phase IV/V Features (Medium Priority)**

*   **A. Phase IV Enhancements:**
    1.  **Multiple RFM Persona Modes:** Define personas, allow user selection in UI, modify `/api/rfm` to use different system prompts/models.
    2.  **Scheduled Thought Rituals:** UI for users to define & schedule prompts; CRON system for execution; store outputs.

*   **B. Foundational Phase V (Cognitive Marketplace):**
    1.  **User-forked Mini-RFM Instances (Initial Exploration):** Design instance architecture, forking mechanism, resource isolation. (Full implementation is complex).
    2.  **Thought Zine Publication System (Basic):** Tools for users to curate memories/reflections into a simple publishable format (e.g., MDX export or basic web page).

*   **C. "Contributing" Section - High Impact Items:**
    1.  **Premium Reflection Templates:** Design and implement a wider variety of structured reflection templates for the private reflection portal.
    2.  **Memory Analysis Algorithms (Basic):** Implement one or two simpler algorithms (e.g., sentiment analysis over time, basic topic modeling) and display insights.

**IV. "Contributing" Section Ideas & Future Polish (Lower Priority / Ongoing)**

*   1.  **Enhanced Visualization of Recursive Thinking:** Research and implement methods to visualize cognitive processes.
*   2.  **Integration with Additional AI Models:** Explore and integrate other AI models for specialized tasks.
*   3.  **Advanced Memory Analysis Algorithms:** Implement more complex analysis techniques.
*   4.  **Generative Content Capabilities:** Tools to generate creative writing, summaries in different styles, etc.
*   5.  **RFM-as-a-Service API (Phase V):** Design and implement a public API with authentication and billing.
*   6.  **Enterprise Solutions (Phase V):** Develop features for organizational use (team management, advanced security).
*   7.  **Collaborative Mind Spaces (Phase V):** Design and implement features for shared interaction and creation.
