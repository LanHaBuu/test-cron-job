/* eslint-disable */
import { getAverageAprPools30d } from "@/src/firestore/average";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowedOrigin = "https://test-cron-job-mu.vercel.app/api";
  const origin = req.headers.origin;

  // Allow CORS for browser requests
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Block requests from unauthorized origins
  if (!origin || origin !== allowedOrigin) {
    return res.status(403).json({ message: "Access denied: Invalid origin" });
  }

  try {
    const data = await getAverageAprPools30d();
    res.setHeader("Cache-Control", "max-age=300");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({});
  }
}
