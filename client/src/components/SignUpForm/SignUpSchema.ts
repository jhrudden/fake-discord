import * as Yup from "yup";
import { SignUpParams } from ".";

const ValidationSchema: Yup.SchemaOf<SignUpParams> = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .min(8, "Must be atleast 8 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .test("match", "Passwords do not match", function (value) {
      return this.parent.password === value;
    })
    .required("Required"),
});

export default ValidationSchema;
