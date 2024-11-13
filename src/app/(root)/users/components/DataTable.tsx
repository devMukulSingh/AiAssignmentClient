"use client";
import { base_url_server } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import PaginationButtons from "./PaginationButtons";
import { useAuth } from "@clerk/nextjs";

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
};

export default function DataTable<TData, TValue>({
  columns,
}: Props<TData, TValue>) {
  const { getToken } = useAuth();
  const page = Number(useSearchParams().get("page")) || 1;
  // const query = useSearchParams().get("query");
  const pageSize = 10;
  const { data, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(`${base_url_server}/user/get-users`, {
        cache:"force-cache",
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      return response.json();
    },
  });

  if (isError) {
    console.log(error);
    toast.error(error.message);
  }
  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // state: {
    //   pagination: {
    //     pageIndex: page,
    //     pageSize,
    //   },
    // },
    // manualPagination: true,
    // enableSorting: true,
  });

  return (
    <div className="md:w-4/5 w-full">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        {/* ////////////////////////////////////////////////////// */}

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <PaginationButtons totalPages={data.totalPages}/> */}
    </div>
  );
}
