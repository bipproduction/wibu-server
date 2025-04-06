import { octokit, options } from "../okto";
export async function workflowsListRun() {
  const data = await octokit.request("GET /repos/{owner}/{repo}/actions/runs",options);

  return data.data.workflow_runs;
}
