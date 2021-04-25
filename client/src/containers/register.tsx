import React from "react";
import { RouteComponentProps } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";

interface Props extends RouteComponentProps {}

const Register: React.FC<Props> = ({ history }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background-pattern ">
      <SignUpForm history={history} />
    </div>
  );
};

export default Register;
