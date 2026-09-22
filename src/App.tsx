import Input from "./components/TextFieldChallenge/Input";
import Label from "./components/TextFieldChallenge/Label";
import TextField from "./components/TextFieldChallenge/TextField";

import "./App.css";
import "./styles/TextField.css";

function App() {
  return (
    <div className="main-container">
      <TextField className="text-field">
        <Label>First Name</Label>
        <Input />
      </TextField>

      <TextField className="text-field">
        <Label>Last Name</Label>
        <Input />
      </TextField>
    </div>
  );
}

export default App;
