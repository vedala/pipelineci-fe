import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PIPELINECI_API_URL = process.env.REACT_APP_PIPELINECI_API_URL;

function Runs() {
  const { getAccessTokenSilently } = useAuth0();

  const [runs, setRuns] = useState([]);

  const { orgName, projectId, projectName } = useParams();

  useEffect(() => {
    async function fetchData() {
      const token = await getAccessTokenSilently();

      let headersObj;
      if (process.env.NODE_ENV === "production") {
        headersObj = {
          'Authorization': `Bearer ${token}`,
        }
      } else {
        headersObj = {
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': '1',
        }
      }

      await axios.get(`${PIPELINECI_API_URL}/runs?projectId=${projectId}`, {
        headers: headersObj
      })
      .then(res => {
        const runsData = res.data;
        setRuns(runsData);
      })
      .catch(err => { console.log(err); throw err; });
    }

    fetchData();
  }, [runs, getAccessTokenSilently, projectId]);

  const runsList = runs.map((run) => {
    return (
      <li key={run.id} className="listitem">
        <span><b>Id:</b> {run.id}</span>&nbsp;
        <span><b>SHA:</b> {run.sha}</span>&nbsp;
        <span><b>Branch:</b> {run.branch}</span>&nbsp;
        <span><b>Status:</b> {run.status}</span>
      </li>
    )
  });

  return (
    <div className="runs">
      <h1>Runs</h1>
      <h3>Organization: {orgName}, Project: {projectName}</h3>
      <label>
        <ul className="list">{runsList}</ul>
      </label>
    </div>
  );
}

export default Runs;
