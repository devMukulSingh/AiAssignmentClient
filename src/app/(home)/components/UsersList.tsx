import DataTable from "./DataTable";
import { UserColumn } from "./UserColumn";

type Props = {};

const UsersList = (props: Props) => {
  return (
    <div className="flex flex-col gap-5 w-full items-center ">
      <h1>Users</h1>
      <DataTable columns={UserColumn} />
    </div>
  );
};

export default UsersList;
