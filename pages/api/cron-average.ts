/* eslint-disable */
import { getAverageAprPools30d } from "@/src/firestore/average";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowedOrigins = [
    "https://test-cron-job-mu.vercel.app",
    "https://www.test-cron-job-mu.vercel.app",
  ];
  const origin = req.headers.origin;

  console.log("Request Origin:", origin);

  if (!origin || !allowedOrigins.includes(origin)) {
    console.log("Blocked request from origin:", origin);
    return res.status(403).json({ message: "Access denied: Invalid origin" });
  }

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const data = await getAverageAprPools30d();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({});
  }
}
