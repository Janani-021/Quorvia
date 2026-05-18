import "../instrument.mjs";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";

import cors from "cors";

import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware()); // req.auth will be available in the request object

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  const port = ENV.PORT;
  // Bind the port immediately so Render can detect the service.
  app.listen(port, () => {
    console.log("Server listening on port:", port);
  });

  // Connect to DB in the background (do not block startup / port binding).
  // Avoid potential startup hangs or memory spikes causing Render port-scan/OOM.
connectDB().catch((error) => {
    console.error("Mongo connection failed (will retry on next start):", error);
  });
};

startServer();

export default app;


