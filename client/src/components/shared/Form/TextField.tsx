import { useField } from "formik";
import React from "react";

type Props = {
  type: string;
  name: string;
  placeholder: string;
};

export const TextField: React.FC<Props> = (props) => {
  const fieldStyle = "flex bg-white h-9 rounded-md w-80";
  const inputStyle = "outline-none text-sm  px-2 w-full rounded-md";
  const focusStyle = "focus:ring-blue-bright focus:ring-2";
  const [field, { error }] = useField({
    name: props.name,
    type: props.name,
  });
  return (
    <div className={` ${fieldStyle} ${error ? "ring-red-600 ring-2" : ""}`}>
      <input
        {...field}
        {...props}
        className={`${inputStyle} ${error ? "" : focusStyle}`}
      />
    </div>
  );
};
