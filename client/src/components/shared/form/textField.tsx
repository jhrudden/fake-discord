import { useField } from "formik";
import React from "react";

type Props = {
  type: string;
  name: string;
  placeholder?: string;
  theme?: string;
};

export const TextField: React.FC<Props> = (props) => {
  const theme = props.theme || "dark";
  const themeFieldOptions: { [key: string]: string } = {
    dark: " bg-gray-darkest ring-gray-deepestDark",
    light: "bg-white ring-gray-dark",
  };
  const themeInputOptions: { [key: string]: string } = {
    dark: "bg-gray-darkest text-white ",
    light: "bg-white text-gray-darkest ",
  };
  const fieldStyle =
    "flex h-9 rounded-md w-full ring-1 " + themeFieldOptions[theme];
  const inputStyle =
    "outline-none text-sm px-2 w-full rounded-md font-medium " +
    themeInputOptions[theme];
  const focusStyle = "focus:ring-blue-bright focus:ring-2";
  const [field, { error }] = useField({
    name: props.name,
    type: props.name,
  });
  return (
    <div className={` ${fieldStyle} ${error ? "ring-red-600 ring-2" : ""}`}>
      <input
        className={`${inputStyle} ${error ? "" : focusStyle}`}
        {...field}
        {...props}
      />
    </div>
  );
};
