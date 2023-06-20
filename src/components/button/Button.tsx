import React, { ReactNode, ButtonHTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "primary" | "secondary" | "danger";
}

const Button = ({
  color = "primary",
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(
        "btn",
        {
          "btn-primary": color === "primary",
          "btn-secondary": color === "secondary",
          "btn-danger": color === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
