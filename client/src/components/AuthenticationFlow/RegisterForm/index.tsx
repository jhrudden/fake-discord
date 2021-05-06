import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import { useRegisterMutation } from "../../../services/graphql/graphql";
import Button from "../../shared/Button";
import { FormHeader } from "../../shared/Form/FormHeader";
import { TextField } from "../../shared/Form/TextField";
import SignUpSchema from "./SignUpSchema";

interface Props {}

export interface SignUpParams {
  email: string;
  password: string;
  confirmPassword: string;
}

// @todo: make signUp somehow add user to cache
const SignUpForm: React.FC<Props> = () => {
  const history = useHistory();
  const [register] = useRegisterMutation();
  const handleSubmit = async (values: SignUpParams) => {
    const res = await register({
      variables: { email: values.email, password: values.password },
    });
    history.push("/");
    console.log(res);
  };

  return (
    <div className="bg-backgroundColor flex flex-col justify-center px-16 py-10 rounded-lg w-400-px shadow-lg border-2 border-gray-dark border-opacity-25">
      <div className="text-center text-white mb-1">
        <div className="text-2xl font-bold">Create an account</div>
      </div>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors }) => (
          <Form className="w-80">
            <FormHeader error={errors.email} text="EMAIL" />
            <TextField name="email" type="email" />
            <FormHeader error={errors.password} text="PASSWORD" />
            <TextField name="password" type="password" />
            <FormHeader
              error={errors.confirmPassword}
              text="CONFIRM PASSWORD"
            />
            <TextField name="confirmPassword" type="confirmPassword" />
            <Button type="submit">Create Account</Button>
            <div
              className="pl-1 pt-2.5 text-blue-base text-xs cursor-pointer hover:text-blue-bright"
              onClick={() => history.push("/login")}
            >
              Already have an account?
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
