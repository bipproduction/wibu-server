import Elysia, { t } from "elysia";
import { reposList } from "./repo-list";
import { reposSearch } from "./repo-search";
import { reposSync } from "./repo-sync";
import branchList from "./branch-list";
import branchSync from "./branch-sync";
import branchSearch from "./branch-search";
import repoGet from "./repo-get";

const ApiGithub = new Elysia({
  prefix: "/github",
  tags: ["Github"],
})
  .get("/repos", reposList, {
    query: t.Object({
      page: t.Number(),
      per_page: t.Number(),
    }),
  })
  .get("/repos-search", reposSearch, {
    query: t.Object({
      q: t.String(),
      page: t.Number(),
      per_page: t.Number(),
    }),
  })
  .get("/repos-sync", reposSync)
  .get("/repo-get", repoGet, {
    query: t.Object({
      projectId: t.String(),
    }),
  })
  .get("/branch-list", branchList, {
    query: t.Object({
      projectId: t.String(),
      page: t.Number(),
      per_page: t.Number(),
    }),
  })
  .get("/branch-search", branchSearch, {
    query: t.Object({
      projectId: t.String(),
      q: t.String(),
      page: t.Number(),
      per_page: t.Number(),
    }),
  })
  .get("/branch-sync", branchSync, {
    query: t.Object({
      projectId: t.String(),
    }),
  });
export default ApiGithub;
