import React from "react";
import { RouteComponentProps } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm";
import { Container } from "./Register.style";

interface Props extends RouteComponentProps {}

const Register: React.FC<Props> = ({ history }) => {
  return (
    <Container>
      <SignUpForm history={history} />
    </Container>
  );
};

export default Register;
