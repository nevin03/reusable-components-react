import React from "react";
import Input from "@/components/shared/Input";
import { useCustomForm } from "@/hooks/useFormik";
import Button from "@/components/shared/Button";
import { step4schema } from "@/utils/validations";
import { toast } from "@/contexts/ToastContext";
import bcrypt from "bcryptjs";
import { LockKeyhole } from "lucide-react";

function UserPass() {
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
        console.log("Payload to submit:", payload);
        toast.success("Password set successfully!");
      } catch (error) {
        toast.error("Something went wrong while setting the password.", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10 text-center">
      <div className="flex flex-col items-center justify-center mb-4">
        <LockKeyhole className="w-8 h-8 text-primary-600" />
        <h2 className="text-2xl font-bold mt-2">Set Password</h2>
      </div>

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

        <div className="pt-4">
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
}

export default UserPass;
