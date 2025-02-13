/* eslint-disable */
import { createOrUpdate, updateElementByIndex } from "@/src/firestore/average";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  const secret = req.query.secret;

  if (secret !== process.env.CRON_SECRET) {

     
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const result = await createOrUpdate();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({});
  }
  
}

