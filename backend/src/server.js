import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as Sentry from "@sentry/node";
import { clerkMiddleware } from "@clerk/express";

// Load environment variables
dotenv.config();

// Import local configs
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

// Inngest (stubbed if not configured)
let functions = [];
let inngest = {};
try {
  const inngestConfig = await import("./config/inngest.js");
  functions = inngestConfig.functions || [];
  inngest = inngestConfig.inngest || {};
} catch (err) {
  console.warn("⚠️ Inngest config not found, skipping...");
}

// Routes
import chatRoutes from "./routes/chat.route.js";

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ENV.CLIENT_URL || "http://localhost:5173",
  credentials: true
}));
app.use(clerkMiddleware()); // Clerk auth middleware

// Debug route
app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

// Root route
app.get("/", (req, res) => {
  res.send("Hello World! Backend is running ✅");
});

// Inngest route (only if config exists)
import { serve } from "inngest/express";
if (inngest && functions) {
  app.use("/api/inngest", serve({ client: inngest, functions }));
}

// Chat routes
app.use("/api/chat", chatRoutes);

// Sentry error handler
Sentry.setupExpressErrorHandler(app);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    const PORT = ENV.PORT || 5000;
    if (ENV.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log("🚀 Server started on port:", PORT);
      });
    }
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();

export default app;