import React from "react";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { useCustomForm } from "@/hooks/useFormik";
import { step2Schema } from "@/utils/validations";
import useFormStore from "@/store/useFormStore";
import GooglePlacesAutocomplete from "@/components/shared/places-api";
import PropTypes from "prop-types";

const UserAddress = ({ onNext, onBack }) => {
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
      setFormData({ ...formData, ...values });
      onNext(); // Move to next step
    },
  });

  const handlePlaceSelect = (selected) => {
    formik.setValues({
      ...formik.values,
      ...selected,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City / Location
        </label>
        <GooglePlacesAutocomplete onPlaceSelect={handlePlaceSelect} />
      </div>

      <Input
        label="Zip Code"
        name="zip"
        value={formik.values.zip}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.zip}
        touched={formik.touched.zip}
      />
      <Input
        label="State"
        name="state"
        value={formik.values.state}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.state}
        touched={formik.touched.state}
      />
      <Input
        label="Country"
        name="country"
        value={formik.values.country}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.country}
        touched={formik.touched.country}
      />
      <Input
        label="Address"
        name="address"
        as="textarea"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.address}
        touched={formik.touched.address}
      />
      <Input
        label="Contact"
        name="contact"
        value={formik.values.contact}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.contact}
        touched={formik.touched.contact}
      />

      <div className="flex justify-between pt-4">
        <Button
          type="button"
          color="secondary"
          variant="rounded"
          onClick={onBack}
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

export default UserAddress;
