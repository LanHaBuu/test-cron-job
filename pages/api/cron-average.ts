
import { getAverageAprPools30d } from "@/src/firestore/average";
import { NextApiResponse } from "next";

export default async function handler(
  // req: NextApiRequest,
  res: NextApiResponse
) {


  try {
    const data = await getAverageAprPools30d();
    res.setHeader("Cache-Control", "max-age=300");
    return res.status(200).send(data);
  } catch (err) {
    console.log('err',err);
    
    return res.status(400).send({});
  }
}
