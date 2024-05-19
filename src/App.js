import { useAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import SignupButton from './components/Signup';

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div className="App">
        { !isAuthenticated
          ? <>
              <LoginButton />
              <SignupButton />
            </>
          : <LogoutButton />
        }
        <Routes>
          <Route path="/" element={<Landing />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
