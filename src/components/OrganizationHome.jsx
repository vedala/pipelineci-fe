import { useParams } from "react-router-dom";

function Landing() {
  const { organizationId } = useParams();
  return (
    <>
      <h1>Orgnization Home</h1>
      <h2>{organizationId}</h2>
    </>
  );
}

export default Landing;
