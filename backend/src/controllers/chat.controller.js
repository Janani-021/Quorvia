import { generateStreamToken } from "../config/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "Unauthorized: userId missing" });
    }

    const token = await generateStreamToken(req.auth.userId);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error generating Stream token:", error);
    res.status(500).json({
      message: "Failed to generate Stream token",
      error: error.message,
    });
  }
};