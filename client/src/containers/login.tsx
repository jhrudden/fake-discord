import React from "react";
import { RouteComponentProps } from "react-router-dom";
import LoginForm from "../components/LoginForm";

interface Props extends RouteComponentProps {}

const Login: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background-pattern ">
      <LoginForm {...props} />
    </div>
  );
};

export default Login;
