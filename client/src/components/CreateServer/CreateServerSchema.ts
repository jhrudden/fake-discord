import * as Yup from "yup";
import { CreateServerParams } from ".";

const ValidationSchema: Yup.SchemaOf<CreateServerParams> = Yup.object().shape({
  serverName: Yup.string().required("Required"),
});

export default ValidationSchema;
