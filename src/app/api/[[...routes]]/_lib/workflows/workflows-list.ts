import { octokit, options } from "../okto";
export async function workflowsList() {
  const data = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/workflows",
    options
  );

  return data.data;
}
