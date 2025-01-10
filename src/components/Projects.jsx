import { useAuth0 } from "@auth0/auth0-react";

function Projects() {
  const { user } = useAuth0();
  return (
    <>
      <h1>Projects</h1>
      <p>Logged in as: { user.name }</p>
    </>
  );
}

export default Projects;
