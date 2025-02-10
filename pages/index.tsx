/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_NEXT_API}/cron-average`);

    setData(res.data);
  };
 
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      {data?.map((item:any,index) => (
        <div key={index}>
          {item?.apr1d && item?.apr1d ?.map((_:any) => (
            <p>{_}</p>
          ))}
          create: {item?.createdAt?._nanoseconds}
        </div>
      ))}
    </>
  );
}
