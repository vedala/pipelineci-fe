import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function Home() {
  return (
    <>
      <LogoutButton />
      <h1>PipelineCI Home Page</h1>
      <Link to="/create-organization">Create Organization</Link>
    </>
  );
}

export default Home;
