import * as Yup from "yup";

export const step1Schema = Yup.object({
  firstName: Yup.string()
    .required("Required")
    .min(3, "First name must be at least 3 characters"),
  lastName: Yup.string().required("Required"),
  age: Yup.number().required("Required").min(0).max(150),
  gender: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
});

export const step2Schema = Yup.object({
  // address: Yup.string()
  //   .required("Address is required")
  //   .min(5, "Address must be at least 5 characters")
  //   .max(100, "Address must be less than 100 characters"),
  // city: Yup.string().required("Required"),
  // state: Yup.string().required("Required"),
  // zip: Yup.string().required("Required"),
  // country: Yup.string().required("Required"),
  // contact: Yup.string().required("Required").min(10).max(10),
});

export const step3Schema = Yup.object({
  access: Yup.array().min(1, "Select at least one access"),
});

export const passwordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#^()_\-+=]/,
      "Password must contain at least one special character"
    ),
});
