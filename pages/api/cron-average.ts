/* eslint-disable */
import { getAverageAprPools30d } from "@/src/firestore/average";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allowedOrigin = "https://test-cron-job-mu.vercel.app/";
 
  const origin = req.headers.origin;

  if (origin && origin !== allowedOrigin) {
    return res.status(403).json({ message: "Access denied: Invalid origin" });
  }

  try {
    const data = await getAverageAprPools30d();
    res.setHeader("Cache-Control", "max-age=300");
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send({});
  }
}
