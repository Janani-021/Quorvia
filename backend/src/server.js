import "../instrument.mjs";
import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
==> Downloading cache...
==> Cloning from https://github.com/Janani-021/Quorvia
==> Checking out commit 57547359f967d968a539683a089fb6b9973268aa in branch main
==> Downloaded 1.3MB in 0s. Extraction took 1s.
==> Using Node.js version 24.14.1 (default)
==> Docs on specifying a Node.js version: https://render.com/docs/node-version
==> Running build command 'npm install'...
added 521 packages, and audited 522 packages in 1m
39 packages are looking for funding
  run `npm fund` for details
17 vulnerabilities (1 low, 3 moderate, 11 high, 2 critical)
To address all issues, run:
  npm audit fix
Run `npm audit` for details.
==> Uploading build...
==> Uploaded in 3.1s. Compression took 4.9s
==> Build successful 🎉
==> Deploying...
==> Setting WEB_CONCURRENCY=1 by default, based on available CPUs in the instance
==> Running 'npm start'
> backend@1.0.0 start
> node --import ./instrument.mjs src/server.js
Debugger listening on ws://127.0.0.1:41011/fcd72088-f2aa-4e73-913f-00dd36b1c9ec
For help, see: https://nodejs.org/en/docs/inspector
==> No open ports detected on 0.0.0.0, continuing to scan...
==> Docs on specifying a port: https://render.com/docs/web-services#port-binding
==> Out of memory (used over 512Mi)
==> Common ways to troubleshoot your deploy: https://render.com/docs/troubleshooting-deploys
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
    console.error("Mongo connection failed (DB will retry on next request/start):", error);
  });
};

startServer();


export default app;


