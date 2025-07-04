import React from "react";
import Table from "@/components/shared/Table";
import PropTypes from "prop-types";
import Button from "@/components/shared/Button";

const UsersData = ({ onBack, onClose }) => {
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
    <div className="space-y-6">
      <Table columns={columns} data={data} initialPageSize={2} />

      <div className="flex justify-between pt-4 border-t">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UsersData;
