import React from "react";
import LoginForm from "../components/AuthenticationFlow/LoginForm";

interface Props {}

const Login: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background-pattern ">
      <LoginForm {...props} />
    </div>
  );
};

export default Login;
