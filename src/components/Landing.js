import { Link } from "react-router-dom";

function Landing() {
  return (
    <>
      <h1>Welcome to PipelineCI</h1>
      <Link to="/home">
        <button>Go to Application</button>
      </Link>
    </>
  );
}

export default Landing;
