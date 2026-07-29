diff --git a/README.md b/README.md
index 0000000..0000000
--- a/README.md
+++ b/README.md
@@
 Updated README to include new backend instructions and seed command.
 
 - Added MongoDB-backed backend with auth and persistent plans/orders.
 - Run `yarn workspace @whally/backend seed` to create admin and sample plans.
 - See docker-compose.yml for a local compose-based setup (includes mongo and backend).
+
+Payments integration
+--------------------
+
+This project now includes sandbox integrations for Paystack and a Hubtel placeholder.
+
+Environment variables (add to your .env or in deployment):
+
+- PAYSTACK_SECRET_KEY=sk_test_xxx
+- HUBTEL_API_KEY=your_hubtel_api_key
+- HUBTEL_API_SECRET=your_hubtel_api_secret
+
+Paystack usage (development):
+
+1. Create an order (POST /api/plans/orders) — receive an orderId.
+2. Initialize Paystack transaction:
+   POST /api/payments/paystack/initialize with { orderId, email, callback_url }
+   The server will call Paystack and return authorization_url to redirect the user.
+3. Configure your Paystack webhook to POST to /api/payments/paystack/webhook and set your webhook secret (PAYSTACK_SECRET_KEY). The webhook handler verifies signatures and marks orders as paid.
+
+Hubtel usage (placeholder):
+
+For Hubtel, the repository includes a placeholder flow. Implement the Hubtel API calls in packages/backend/src/routes/payments.js according to Hubtel docs and add the required credentials in .env.
+
