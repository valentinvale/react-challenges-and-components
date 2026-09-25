import Input from "./Input";
import Label from "./Label";
import TextField from "./TextField";

export default function TextFieldChallengeApp() {
  return (
    <>
      <TextField className="text-field">
        <Label>First Name</Label>
        <Input />
      </TextField>

      <TextField className="text-field">
        <Label>Last Name</Label>
        <Input />
      </TextField>
    </>
  );
}
