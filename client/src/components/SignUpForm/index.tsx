import { Form, Formik } from "formik";
import React from "react";
import { useRegisterMutation } from "../../hooks/graphql/graphql";
import {
  ButtonContainer,
  Container,
  FormError,
  FormField,
  FormHeader,
  Header,
  LoginLink,
  SubmitButton,
  Title,
} from "./Register.style";
import SignUpSchema from "./SignUpSchema";

interface Props {
  history: {
    push: (path: string) => void;
  };
}

export interface SignUpParams {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC<Props> = ({ history }) => {
  const [register] = useRegisterMutation();
  const handleSubmit = async (values: SignUpParams) => {
    const res = await register({
      variables: { email: values.email, password: values.password },
    });
    history.push("/");
    console.log(res);
  };

  return (
    <Container>
      <Header>
        <Title>Create an account</Title>
      </Header>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={SignUpSchema}
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
            <FormHeader error={errors.confirmPassword}>
              CONFIRM PASSWORD
              <FormError error={errors.confirmPassword}>
                {errors.confirmPassword}
              </FormError>
            </FormHeader>
            <FormField
              name="confirmPassword"
              type="password"
              error={errors.password}
            />
            <ButtonContainer>
              <SubmitButton type="submit">Submit</SubmitButton>
            </ButtonContainer>
            <LoginLink onClick={() => history.push("/login")}>
              Already have an account?
            </LoginLink>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUpForm;
