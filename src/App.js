import './App.css';
import Landing from './components/Landing';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SignupButton from './components/Signup';

function App() {
  return (
    <div className="App">
      <LoginButton /> <SignupButton />
      <LogoutButton />
      <Landing />
    </div>
  );
}

export default App;
