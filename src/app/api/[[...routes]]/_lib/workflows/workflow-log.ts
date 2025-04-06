import { Context } from "elysia";
import { octokit, options } from "../okto";

export async function workflowsLog(c: Context) {
  const { run_id, attempt_number } = c.params;

  if (!run_id) return { message: "Missing run_id" };

  try {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs",
      {
        ...options,
        run_id: Number(run_id),
        attempt_number: Number(attempt_number ?? 1),
      }
    );

    console.log(response, "RES");
    return c.redirect(response.url); 
  } catch (error) {
    console.error(error);
    return { message: "Failed to fetch log" };
  }
}
