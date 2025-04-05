import { Context } from "elysia";
import { octokit, options } from "../okto";

export async function workflowsGet(c: Context) {
  const { params } = c;
  const { workflow_id } = params;
  if (!workflow_id) {
    return {
      message: "workflowId is required",
    };
  }
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}",
    {
      ...options,
      workflow_id,
    }
  );
  return data;
}
