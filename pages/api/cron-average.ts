/* eslint-disable */
import { getAverageAprPools30d } from "@/src/firestore/average";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const referer = req.headers.referer;
  const allowedOrigin = "https://test-cron-job-mu.vercel.app";

  // Allow request if:
  // - `origin` matches allowedOrigin
  // - OR `referer` starts with allowedOrigin
  if (
    (!referer || !referer.startsWith(allowedOrigin))
  ) {
    return res.status(403).json({ message: "Access denied: Invalid origin" });
  }
  try {
    const data = await getAverageAprPools30d();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({});
  }
}
