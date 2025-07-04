import React from "react";
import Input from "@/components/shared/Input";
import { useCustomForm } from "@/hooks/useFormik";
import Button from "@/components/shared/Button";
import { step4schema } from "@/utils/validations";
import { toast } from "@/contexts/ToastContext";
import bcrypt from "bcryptjs";
import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserPass({ onBack, closeModal }) {
  const navigate = useNavigate();

  const formik = useCustomForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: step4schema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const hashedPassword = await bcrypt.hash(values.password, 10);
        const payload = {
          password: hashedPassword,
        };
        console.log("hashed payload:", payload);
        toast.success("User successfully created!");
        closeModal();
        navigate("/users");
      } catch (error) {
        toast.error("Failed to set password.", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          label="Password"
          name="password"
          type="password"
          {...formik.getFieldProps("password")}
          error={formik.errors.password}
          touched={formik.touched.password}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          error={formik.errors.confirmPassword}
          touched={formik.touched.confirmPassword}
        />

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            onClick={onBack}
            color="secondary"
            variant="rounded"
          >
            Back
          </Button>
          <Button
            type="submit"
            color="primary"
            variant="rounded"
            loading={formik.isSubmitting}
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserPass;
