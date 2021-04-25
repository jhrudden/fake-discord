import { useField } from "formik";
import React from "react";

type Props = {
  type: string;
  name: string;
  placeholder?: string;
};

export const TextField: React.FC<Props> = (props) => {
  const fieldStyle =
    "flex h-9 rounded-md bg-gray-darkest w-80 ring-1 ring-gray-deepestDark";
  const inputStyle =
    "outline-none bg-gray-darkest text-sm  px-2 w-full rounded-md text-white font-medium";
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
