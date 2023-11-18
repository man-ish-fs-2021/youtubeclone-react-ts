import { VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "./ButtonStyles";

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;
// const classes = buttonStyles({size: "icon"})
const Button = ({
  variant,
  size,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    >
      {children}
    </button>
  );
};

export default Button;
