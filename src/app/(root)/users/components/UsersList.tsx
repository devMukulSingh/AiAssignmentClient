import { Suspense } from "react";
import DataTable from "./DataTable";
import { UserColumn } from "./UserColumn";

type Props = {};

const UsersList = (props: Props) => {
  return (
    <div className="flex flex-col gap-5 w-full items-center ">
      <h1>Users</h1>
      <Suspense>
        <DataTable columns={UserColumn} />
      </Suspense>
    </div>
  );
};

export default UsersList;
