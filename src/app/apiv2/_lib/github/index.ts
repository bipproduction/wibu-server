import Elysia from "elysia";
import { reposList } from "./repos";
import { reposSearch } from "./rearch";
import { reposSync } from "./sync";

const ApiGithub = new Elysia({
  prefix: "/github",
  tags: ["Github"],
})
  .get("/repos/:page/:per_page", reposList)
  .get("/repos-search/:q/:page/:per_page", reposSearch)
  .get("/repos-sync", reposSync);

export default ApiGithub;
