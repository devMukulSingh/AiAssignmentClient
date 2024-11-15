"use client";
import { Edit, Menu, Trash } from "lucide-react";
import { TUserTable } from "./UserColumn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { base_url_server } from "@/lib/utils";
import { AlertModal } from "@/components/AlertModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = {
  data: TUserTable;
};

const UserActions = ({ data }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await fetch(`${base_url_server}/user/${data.id}/delete-user`, {
        method: "DELETE",
      });
    },
    onSuccess() {
      setIsOpen(false);
      toast.success(`User deleted`);
      queryClient.invalidateQueries({
        queryKey: ["users"],
        exact: true,
      });
      // revalidatePath('/users')
          // queryClient.refetchQueries({
          //   queryKey: ["users"],
          //   stale: true,
          //   type: "all",
          // });
    },
  });
  return (
    <div>
      <AlertModal
        isOpen={isOpen}
        loading={isPending}
        onClose={() => setIsOpen(false)}
        onConform={() => mutate()}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="w-4 h-4 mr-3" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserActions;
