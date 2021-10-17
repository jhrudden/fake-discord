import * as Yup from "yup";
import { UserInputType } from "./index";

const ValidationSchema: Yup.SchemaOf<UserInputType> = Yup.object().shape({
    content: Yup.string().required("Required"),
});

export default ValidationSchema;
