import * as Yup from "yup";
import { LoginParams } from "./index";

const ValidationSchema: Yup.SchemaOf<LoginParams> = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string().required("Required"),
});

export default ValidationSchema;
