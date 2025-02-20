/* eslint-disable */
import { createOrUpdate, updateElementByIndex } from "@/src/firestore/average";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {


  try {
    const result = await createOrUpdate();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({});
  }
  
}

