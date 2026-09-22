import { type ComponentPropsWithoutRef } from "react";
import { useTextFieldContext } from "./TextFieldContext";

type LabelProps = ComponentPropsWithoutRef<"label">;

export default function Label({ children, ...rest }: LabelProps) {
  const id = useTextFieldContext();

  return (
    <label htmlFor={id} {...rest}>
      {children}
    </label>
  );
}
