import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import * as Sentry from "@sentry/react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

const App = () => {
  return (
    <>
      <button
        onClick={() => {
          throw new Error("My test error from App.jsx");
        }}
      >
        THROW ERROR
      </button>
      <SignedIn>
        <SentryRoutes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Navigate to={"/"} replace />} />
        </SentryRoutes>
      </SignedIn>
      <SignedOut>
        <SentryRoutes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to={"/auth"} replace />} />
        </SentryRoutes>
      </SignedOut>
    </>
  );
};

export default App;