import { Form, Formik } from "formik";
import React from "react";
import { useRegisterMutation } from "../../hooks/graphql/graphql";
import { FormHeader } from "../shared/Form/FormHeader";
import { TextField } from "../shared/Form/TextField";
import {
  ButtonContainer,
  Container,
  FormField,
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
            <FormHeader error={errors.email} text="EMAIL" />
            <TextField
              name="email"
              type="email"
              placeholder="email@email.com"
            />
            <FormHeader error={errors.password} text="PASSWORD" />
            <TextField
              name="password"
              type="password"
              placeholder="bad password"
            />
            <FormHeader
              error={errors.confirmPassword}
              text="CONFIRM PASSWORD"
            />
            <TextField
              name="confirmPassword"
              type="confirmPassword"
              placeholder=""
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
