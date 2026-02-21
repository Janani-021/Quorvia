import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
console.log("STREAM_API_KEY available:", !!STREAM_API_KEY);

const CallPage = () => {
  const { id: callId } = useParams();
  const { user, isLoaded } = useUser();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState(null);

  const { data: tokenData, isLoading: isTokenLoading, error: tokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!user,
  });

  useEffect(() => {
    const initCall = async () => {
      console.log("Init call started", {
        hasToken: !!tokenData?.token,
        hasUser: !!user,
        callId,
        userId: user?.id,
        isTokenLoading,
        tokenError: !!tokenError,
        tokenData: tokenData
      });
      setIsConnecting(true);

      if (isTokenLoading) {
        console.log("Token still loading, waiting...");
        setIsConnecting(false);
        return;
      }

      if (tokenError) {
        console.error("Token error:", tokenError);
        setError("Failed to get authentication token");
        setIsConnecting(false);
        return;
      }

      if (!tokenData?.token || !user || !callId) {
        console.log("Conditions not met, skipping init", {
          tokenExists: !!tokenData?.token,
          userExists: !!user,
          callIdExists: !!callId,
          user: user,
          callId: callId,
          tokenData: tokenData
        });
        setIsConnecting(false);
        return;
      }

      try {
        console.log("Creating StreamVideoClient");
        if (!STREAM_API_KEY) {
          throw new Error("STREAM_API_KEY is not configured");
        }

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: {
            id: user.id,
            name: user.fullName,
            image: user.imageUrl,
          },
          token: tokenData.token,
        });

        const callInstance = videoClient.call("default", callId);
        console.log("Joining call");
        await callInstance.join({ create: true });

        console.log("Call joined successfully");
        setClient(videoClient);
        setCall(callInstance);
        setError(null);
      } catch (error) {
        console.error("Error init call:", error);
        const errorMessage = error.message || "Cannot connect to the call.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, user, callId]);

  if (!callId) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Call Link</h2>
          <p className="text-gray-600 mb-6">This call link is missing a valid call ID.</p>
          <p className="text-sm text-gray-500">Please use a valid call link or start a new call from a channel.</p>
        </div>
      </div>
    );
  }

  if (isConnecting || !isLoaded) {
    return <div className="h-screen flex justify-center items-center">Connecting to call...</div>;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-4xl mx-auto">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;