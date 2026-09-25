import type { ComponentPropsWithoutRef } from "react";
import type { JobExperience } from "./types";

type AddExperienceFormProps = {
  onSave: (newExperience: JobExperience) => void;
  onCancel: () => void;
} & ComponentPropsWithoutRef<"form">;

export default function AddExperienceForm({
  onSave,
  onCancel,
  ...rest
}: AddExperienceFormProps) {
  return <form {...rest}>
    
  </form>;
}
