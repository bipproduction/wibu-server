import { Context } from "elysia";
import { octokit, options } from "../okto";

export async function getRepos(c: Context) {
  const { page, per_page } = c.params;
  const data = await octokit.request("GET /users/{username}/repos", {
    ...options,
    username: options.owner,
    type: "all",
    page: Number(page),
    per_page: Number(per_page),
  });

  return data;
}
