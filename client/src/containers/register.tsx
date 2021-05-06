import React from "react";
import SignUpForm from "../components/AuthenticationFlow/RegisterForm";

interface Props {}

const Register: React.FC<Props> = (props) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background-pattern ">
      <SignUpForm {...props} />
    </div>
  );
};

export default Register;
