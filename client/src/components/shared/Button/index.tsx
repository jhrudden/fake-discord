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
    large: "w-full max-w-md h-10",
    medium: "w-3/4 max-w-sm h-10",
    small: "w-1/2 max-w-xs h-10",
  };

  const colors: any = {
    brightBlue: "bg-blue-base",
    transparent: "bg-transparent",
  };

  const highlight: any = {
    brightBlue: "bg-blue-bright",
    transparent: "bg-transparent",
  };

  const textColor: any = {
    brightBlue: "text-white",
    transparent: "text-black",
  };

  const style = `${"border-0 rounded-md py-2.5 mt-3 text-sm"}  ${
    colors[color]
  } ${sizes[size]}
  ${textColor[color]}
 ${`hover:${highlight[color]}`} `;

  return (
    <button className={style} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
