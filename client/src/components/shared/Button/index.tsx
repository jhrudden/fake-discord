import React from "react";

type Props = {
  size?: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
  color?: string;
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({
  size = "large",
  onClick,
  color = "brightBlue",
  type,
  children,
}) => {
  const sizes: any = {
    large: "w-full",
    medium: "w-3/4",
    small: "w-1/2",
  };

  const colors: any = {
    brightBlue: "bg-blue-base",
  };

  const highlight: any = {
    brightBlue: "bg-blue-bright",
  };

  const style = `${"border-0 rounded-md py-2.5 mt-3 text-white text-sm"}  ${
    colors[color]
  } ${sizes[size]}
 ${`hover:${highlight[color]}`} `;

  return (
    <button className={style} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
