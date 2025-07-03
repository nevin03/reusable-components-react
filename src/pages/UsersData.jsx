import React from "react";
import Table from "@/components/shared/Table";

const UsersData = () => {
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.original)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = [
    { name: "Alice Johnson", role: "Admin" },
    { name: "Bob Smith", role: "Manager" },
    { name: "Carol Lee", role: "User" },
  ];

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user) => {
    console.log("Delete user:", user);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <Table columns={columns} data={data} initialPageSize={5} />
    </div>
  );
};

export default UsersData;
