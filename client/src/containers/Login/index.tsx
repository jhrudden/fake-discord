import React from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { Container } from "./Login.style";

type Props = {} & RouteComponentProps;

const Login: React.FC<Props> = (props: RouteComponentProps) => {
  return (
    <Container>
      <LoginForm {...props} />
    </Container>
  );
};

export default Login;
