import { Form, Formik } from "formik";
import React from "react";
import { RouteComponentProps } from "react-router";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
} from "../../services/graphql/graphql";
import { accessTokenVar } from "../../util/accessToken";
import Button from "../shared/Button";
import { FormHeader } from "../shared/Form/FormHeader";
import { TextField } from "../shared/Form/TextField";
import SignInSchema from "./SignInSchema";

interface Props extends RouteComponentProps {}

export interface LoginParams {
  email: string;
  password: string;
}

// TODO: Make typing input adds to query params, which get passed to register
const LoginForm: React.FC<Props> = ({ history }) => {
  const [login] = useLoginMutation();
  const handleSubmit = async (values: LoginParams) => {
    const res = await login({
      variables: { email: values.email, password: values.password },
      update: (cache, { data }) => {
        if (!data) {
          return null;
        }
        cache.writeQuery<CurrentUserQuery>({
          query: CurrentUserDocument,
          data: {
            currentUser: data.login.user,
          },
        });
      },
    });
    if (res && res.data) {
      accessTokenVar(res.data.login.accessToken);
    }
    history.push("/");
  };
  return (
    <div className="bg-backgroundColor flex flex-col justify-center px-16 py-10 rounded-lg w-400-px shadow-lg border-2 border-gray-dark border-opacity-25">
      <div className="text-center text-white mb-2">
        <div className="text-2xl font-bold">Welcome Home</div>
        <div className="text-base text-gray-light">
          Excited to see you back!
        </div>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors }) => (
          <Form>
            <FormHeader error={errors.email} text="EMAIL" />
            <TextField name="email" type="email" />
            <FormHeader error={errors.password} text="PASSWORD" />
            <TextField name="password" type="password" />
            <div className="flex justify-center">
              <Button type="submit">Login</Button>
            </div>
            <div className="flex pt-1.5">
              <div className="text-xs text-gray-base">
                Don't have an account?{" "}
              </div>
              <span
                className="pl-1 text-blue-base text-xs cursor-pointer hover:text-blue-bright"
                onClick={() => history.push("/register")}
              >
                Register
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
