import { createOrUpdate, updateElementByIndex } from "@/src/firestore/average";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const apiKey = req.body.apiKey;

    // if (!apiKey) {
    //   return res.status(400).send({});
    // }

    try {
      const result = await createOrUpdate()
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send({});
    }
  }

  if (req.method === "PATCH") {
    const apiKey = req.body.apiKey;
    const index = req.body.index

    if (!apiKey) {
        return res.status(400).send({});
      }
    try {
      const result = await updateElementByIndex(index)
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send({});
    }
  }

  return res.status(400).send({});
}
