"use client";
import { base_url_server } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { botSchema } from "@/lib/schema";
import { z } from "zod";
import { IapiResponse } from "@/lib/types";
import NameField from "./NameField";
import DescriptionField from "./DescriptionField";
import AboutField from "./AboutField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

type Props = {};

export type formValues = z.infer<typeof botSchema>;

const BotForm = (props: Props) => {
    const router = useRouter();
  const queryClient = useQueryClient();
  const { isFetching, isFetched, data } = useQuery<IapiResponse<formValues>>({
    queryKey: ["bot_data"],
    queryFn: async () => {
      const data = await fetch(`${base_url_server}/bot/get-botDetails`, {
        cache: "force-cache",
        next: {
          revalidate: 10,
        },
      }).then((res) => res.json());
      return data;
    },
  });

  //////////////////////////////////////////////
  const { mutate, isPending } = useMutation<IapiResponse<{}>, any, formValues>({
    mutationKey: ["update-bot"],
    mutationFn: async (data) => {
      const res = await fetch(`${base_url_server}/bot/edit-bot`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "PUT",
      }).then((res) => res.json());
      toast.success("Bot updated ");
      router.refresh();
      return res;
    },
  });
  ///////////////////////////////////////
  const form = useForm<formValues>({
    resolver: zodResolver(botSchema),
    defaultValues: {
      about: "",
      description: "",
      name: "",
    },
  });
  function onSubmit(data: formValues) {
    mutate(data);
  }
  useEffect(() => {
    if (isFetched) form.reset(data?.data);
  }, [isFetched]);
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 h-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-5">
          <NameField form={form} isPending={isFetching} />
          <AboutField form={form} isPending={isFetching} />
          <DescriptionField form={form} isPending={isFetching} />
        </div>
        <Button
          disabled={isFetching || isPending}
          className="mt-10 sm:w-1/3 self-center w-full"
        >
          Edit Bot
        </Button>
      </form>
    </Form>
  );
};

export default BotForm;
