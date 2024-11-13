"use client";
import { Button } from "@/components/ui/button";
import { IapiResponse } from "@/lib/types";
import { base_url_server } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import {  useQuery } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

type Props = {};

const ApiKeysPage = (props: Props) => {
  const { getToken } = useAuth();
  const { isPending, data } = useQuery<IapiResponse<{ token: string }>>({
    queryKey: ["bot_token"],
    queryFn: async () => {
      return await fetch(`${base_url_server}/apikeys/get-apikeys`, {
        cache: "force-cache",
        next: {
          revalidate: false,
        },
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          "Cache-control": "max-age=10000",
        },
      }).then((res) => res.json());
    },
  });
  const handleCopy = () => {
    if(data?.data.token)
    window.navigator.clipboard.writeText(data?.data.token);
    toast.success("Api copied");
  };
  return (
    <div className="flex flex-col gap-5 h-full py-10 w-full  justify-center  items-center">
      <div className="border flex flex-col gap-5 p-5 rounded-md shadow-md h-[15rem] min-w-[30rem] ">
        <h1 className="text-2xl font-semibold text-center">Manage Api keys</h1>
        <div className="flex justify-between items-center gap-5">
          <h1 className="font-semibold">Current Api key - </h1>
          <h1>{data?.data.token}</h1>
          <Button onClick={handleCopy} size={"icon"} variant={"ghost"}>
            <Copy size={15} className="cursor-pointer" />
          </Button>
        </div>
        {/* <Button disabled={isPending} className="mt-auto w-fit">
          Generate new Api key
        </Button> */}
      </div>
    </div>
  );
};

export default ApiKeysPage;
