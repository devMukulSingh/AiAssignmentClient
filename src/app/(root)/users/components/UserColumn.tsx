"use client";
import { ColumnDef } from "@tanstack/react-table";
import UserActions from "./UserActions";
import { format } from "date-fns";

export type TUserTable = {
  id: string;
  name: string;
  createdAt: string;
};

export const UserColumn: ColumnDef<TUserTable>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date added",
    cell: ({ row }) => <>{format(row.original.createdAt, "PP - p")}</>,
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions data={row.original} />,
  },
];
