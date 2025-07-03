// src/pages/UserAddress.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useCustomForm } from "@/hooks/useFormik";
import { step2Schema } from "@/utils/validations";
import useFormStore from "@/store/useFormStore";

const UserAddress = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useFormStore();

  const formik = useCustomForm({
    initialValues: {
      address: formData.address || "",
      city: formData.city || "",
      state: formData.state || "",
      zip: formData.zip || "",
      country: formData.country || "",
      contact: formData.contact || "",
    },
    validationSchema: step2Schema,
    onSubmit: (values) => {
      setFormData(values);
      navigate("/user-info");
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 mt-10 max-w-xl mx-auto p-6 bg-white rounded shadow"
    >
      <Input
        label="Address"
        name="address"
        as="textarea"
        {...formik.getFieldProps("address")}
        error={formik.errors.address}
        touched={formik.touched.address}
      />
      <Input
        label="Zip Code"
        name="zip"
        {...formik.getFieldProps("zip")}
        error={formik.errors.zip}
        touched={formik.touched.zip}
      />
      <Input
        label="City"
        name="city"
        {...formik.getFieldProps("city")}
        error={formik.errors.city}
        touched={formik.touched.city}
      />
      <Input
        label="State"
        name="state"
        {...formik.getFieldProps("state")}
        error={formik.errors.state}
        touched={formik.touched.state}
      />

      <Input
        label="Country"
        name="country"
        {...formik.getFieldProps("country")}
        error={formik.errors.country}
        touched={formik.touched.country}
      />
      <Input
        label="Contact"
        name="contact"
        {...formik.getFieldProps("contact")}
        error={formik.errors.contact}
        touched={formik.touched.contact}
      />

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          color="secondary"
          onClick={() => navigate("/user-info")}
        >
          Back
        </Button>
        <Button type="submit" color="primary">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default UserAddress;
