import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

function Home() {
  const { user } = useAuth0();

  return (
    <>
      <h1>PipelineCI Home Page</h1>
      <p>Logged in as: { user.name }</p>
      <Link to="/create-organization">Create Organization</Link>
    </>
  );
}

export default Home;
