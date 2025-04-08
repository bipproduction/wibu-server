import { Context } from "elysia";
import { octokit, options } from "../okto";
export async function searchRepos(c: Context) {
  const { query, page, per_page } = c.params;
  const data = await octokit.request("GET /search/repositories", {
    ...options,
    q: query,
    page: Number(page),
    per_page: Number(per_page),
  });
  return data;
}
