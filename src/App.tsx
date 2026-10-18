import "./App.css";
import GithubRepoSearch from "./components/GithubRepoSearch/GithubRepoSearch";
//import Profile from "./components/AddExperienceForm/Profile";
import "./styles/TextField.css";
//import TextFieldChallengeApp from "./components/TextFieldChallenge/TextFieldChallendeApp";

function App() {
  return (
    <div className="main-container">
      {/* <TextFieldChallengeApp /> */}
      {/* <Profile /> */}
      <GithubRepoSearch title="Github Repositories Search" />
    </div>
  );
}

export default App;
