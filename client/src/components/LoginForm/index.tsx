import { Form, Formik } from "formik";
import React from "react";
import { RouteComponentProps } from "react-router";
import { accessTokenVar } from "../../accessToken";
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useLoginMutation,
} from "../../hooks/graphql/graphql";
import {
  ButtonContainer,
  Container,
  Description,
  FormError,
  FormField,
  FormHeader,
  Header,
  Register,
  RegisterContainer,
  RegisterSubText,
  SubmitButton,
  Title,
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
    console.log(res);
    if (res && res.data) {
      accessTokenVar(res.data.login.accessToken);
    }
    history.push("/");
  };
  return (
    <Container>
      <Header>
        <Title>Welcome Home</Title>
        <Description>Excited to see you back!</Description>
      </Header>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors }) => (
          <Form>
            <FormHeader error={errors.email}>
              EMAIL
              <FormError error={errors.email}>{errors.email}</FormError>
            </FormHeader>
            <FormField name="email" error={errors.email} />
            <FormHeader error={errors.password}>
              PASSWORD
              <FormError error={errors.password}>{errors.password}</FormError>
            </FormHeader>
            <FormField
              name="password"
              type="password"
              error={errors.password}
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
    </Container>
  );
};

export default LoginForm;
