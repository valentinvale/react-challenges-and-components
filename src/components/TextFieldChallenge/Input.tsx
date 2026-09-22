import { type ComponentPropsWithoutRef } from "react";
import { useTextFieldContext } from "./TextFieldContext";

type InputProps = ComponentPropsWithoutRef<"input">;

export default function Input({ type = "text", ...rest }: InputProps) {
  const id = useTextFieldContext();

  return <input type={type} id={id} {...rest} />;
}
