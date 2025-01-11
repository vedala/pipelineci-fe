import { useParams } from "react-router-dom";

function Runs() {
  const { projectId } = useParams();
  return (
    <>
      <h1>Runs Home</h1>
      <h2>Project: {projectId}</h2>
    </>
  );
}

export default Runs;
