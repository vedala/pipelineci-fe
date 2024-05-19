import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import Landing from './components/Landing';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SignupButton from './components/Signup';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      { !isAuthenticated
        ? <>
            <LoginButton />
            <SignupButton />
          </>
        : <LogoutButton />
      }
      <Landing />
    </div>
  );
}

export default App;
