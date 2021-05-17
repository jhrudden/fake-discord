import React from "react";

type HeaderProps = {
  error: string | undefined;
  text: string;
};

export const FormHeader: React.FC<HeaderProps> = ({ error, text }) => {
  const errorColor = "text-red-600";
  const baseColor = "text-gray-light";
  const transition = "transition duration-300 ease-in-out";
  const headerTitle = "relative font-medium text-xs pb-1 mt-4";
  const errorMessage = "relative font-medium text-xs";
  const dash = "relative ml-1.5 pr-1";
  return (
    <div
      className={`${headerTitle} ${transition} ${
        error ? errorColor : baseColor
      }`}
    >
      {text}
      <span
        className={`${dash} ${errorColor} ${transition} ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        -
      </span>
      <span
        className={`${errorMessage} ${transition} ${errorColor} ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error}
      </span>
    </div>
  );
};
