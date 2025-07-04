import React from "react";
import Table from "@/components/shared/Table";
import Button from "@/components/shared/Button";
import { useNavigate } from "react-router-dom";

const UsersData = () => {
  const navigate = useNavigate();

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
          <Button
            type="button"
            variant="text"
            color="primary"
            onClick={() => handleEdit(row.original)}
            className="text-blue-600 underline"
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="text"
            color="red"
            onClick={() => handleDelete(row.original)}
            className="text-red-600 underline"
          >
            Delete
          </Button>
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
    <div className="flex">
      {/* Navbar */}
      <nav className="w-40 min-h-screen bg-gray-100 flex flex-col items-start p-4">
        <Button
          type="button"
          color="primary"
          variant="rounded"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </nav>
      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <Table columns={columns} data={data} initialPageSize={2} />
      </div>
    </div>
  );
};

export default UsersData;
