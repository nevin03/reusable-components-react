import React from "react";
import { useCustomForm } from "@/hooks/useFormik";
import useFormStore from "@/store/useFormStore";
import { step3Schema } from "@/utils/validations";
import Checkbox from "@/components/shared/Checkbox";
import Button from "@/components/shared/Button";

const accessOptions = [
  { value: "view", label: "View user list" },
  { value: "edit", label: "Edit user" },
  { value: "delete", label: "Delete user" },
  { value: "create", label: "Create user" },
];

const UserAccess = ({ onNext, onBack }) => {
  const { formData, setFormData } = useFormStore();

  const formik = useCustomForm({
    initialValues: {
      access: formData.access || [], // store selected as array
    },
    validationSchema: step3Schema,
    onSubmit: (values) => {
      setFormData(values);
      onNext();
    },
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const newAccess = checked
      ? [...formik.values.access, value]
      : formik.values.access.filter((item) => item !== value);

    formik.setFieldValue("access", newAccess);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Access to:
      </label>
      <div className="flex flex-col gap-2">
        {accessOptions.map((option) => (
          <Checkbox
            key={option.value}
            name="access"
            value={option.value}
            label={option.label}
            checked={formik.values.access.includes(option.value)}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>

      {formik.touched.access && formik.errors.access && (
        <div className="text-red-500 text-sm">{formik.errors.access}</div>
      )}

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="rounded"
          color="secondary"
          onClick={() => onBack()}
        >
          Back
        </Button>
        <Button type="submit" variant="rounded" color="primary">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default UserAccess;
