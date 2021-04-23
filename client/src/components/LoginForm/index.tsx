import { Form, Formik } from "formik";
import React from "react";
import { RouteComponentProps } from "react-router";
import { accessTokenVar } from "../../accessToken";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
} from "../../hooks/graphql/graphql";
import { FormHeader } from "../shared/Form/FormHeader";
import { TextField } from "../shared/Form/TextField";
import {
  ButtonContainer,
  FormField,
  Register,
  RegisterContainer,
  RegisterSubText,
  SubmitButton,
} from "./LoginForm.style";
import SignInSchema from "./SignInSchema";

interface Props extends RouteComponentProps {}

export interface LoginParams {
  email: string;
  password: string;
}

// TODO: fix login form not redirecting to home
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
    <div className="bg-gray-darker flex flex-col justify-center px-16 py-10 rounded-lg w-400-px shadow-lg border-2 border-gray-dark border-opacity-25">
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
            <TextField name="email" type="email" placeholder="" />
            <FormHeader error={errors.password} text="PASSWORD" />
            <TextField
              name="password"
              type="password"
              placeholder="bad password"
            />
            <ButtonContainer>
              <SubmitButton type="submit">Submit</SubmitButton>
            </ButtonContainer>
            <RegisterContainer>
              <RegisterSubText>Don't have an account? </RegisterSubText>
              <Register onClick={() => history.push("/register")}>
                Register
              </Register>
            </RegisterContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
