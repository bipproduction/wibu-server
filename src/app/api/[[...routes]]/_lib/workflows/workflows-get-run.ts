import { Context } from "elysia";
import { octokit, options } from "../okto";
export async function workflowsGetRun(c: Context) {
  const { run_id } = c.params;
  if (!run_id) {
    return {
      message: "Missing run_id",
    };
  }

  const data = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/runs/{run_id}",
    {
      ...options,
      run_id: Number(run_id),
    }
  );

  return data.data;
}
