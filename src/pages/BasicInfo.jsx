// src/pages/BasicInfo.jsx
import React from "react";
import { useCustomForm } from "@/hooks/useFormik";
import { step1Schema } from "@/utils/validations";
import Button from "@/components/shared/Button";
import Select from "@/components/shared/Select";
import Radio from "@/components/shared/Radio";
import Input from "@/components/shared/Input";
import useFormStore from "@/store/useFormStore";

const BasicInfo = ({ onNext }) => {
  const { formData, setFormData } = useFormStore();

  const formik = useCustomForm({
    initialValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      age: formData.age || "",
      gender: formData.gender || "",
      role: formData.role || "",
    },
    validationSchema: step1Schema,
    onSubmit: (values, { setSubmitting }) => {
      setFormData({ ...formData, ...values });
      onNext();
      setSubmitting(false);
    },
  });

  return (
    <div className="w-full p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          label="First Name"
          name="firstName"
          {...formik.getFieldProps("firstName")}
          error={formik.errors.firstName}
          touched={formik.touched.firstName}
        />
        <Input
          label="Last Name"
          name="lastName"
          {...formik.getFieldProps("lastName")}
          error={formik.errors.lastName}
          touched={formik.touched.lastName}
        />
        <Input
          label="Age"
          name="age"
          type="number"
          {...formik.getFieldProps("age")}
          error={formik.errors.age}
          touched={formik.touched.age}
        />
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <div className="flex gap-4">
            {["male", "female", "other"].map((val) => (
              <Radio
                key={val}
                name="gender"
                label={val}
                value={val}
                checked={formik.values.gender === val}
                onChange={formik.handleChange}
              />
            ))}
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-sm">{formik.errors.gender}</div>
          )}
        </div>
        <Select
          name="role"
          label="Role"
          options={[
            { label: "Select role", value: "" },
            { label: "Admin", value: "admin" },
            { label: "Manager", value: "manager" },
          ]}
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.role}
          touched={formik.touched.role}
        />

        <div className=" flex justify-end">
          <Button
            type="submit"
            color="primary"
            variant="rounded"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicInfo;
