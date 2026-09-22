import { useId, type ComponentPropsWithoutRef } from "react";
import { TextFieldContext } from "./TextFieldContext";

type TextFieldProps = ComponentPropsWithoutRef<"div">;

export default function TextField({ children, ...rest }: TextFieldProps) {
  const id = useId();

  return (
    <TextFieldContext value={id}>
      <div {...rest}>{children}</div>
    </TextFieldContext>
  );
}
