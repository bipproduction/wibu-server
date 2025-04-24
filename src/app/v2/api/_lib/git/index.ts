import Elysia, { t } from "elysia";
import gitRepoSync from "./repo/sync";
import repoFindMany from "./repo/find-many";
import gitRepoSearch from "./repo/search";
import gitBranchSync from "./branch/sync";

const Repo = new Elysia({
  prefix: "/repo",
})
  .get("/sync", gitRepoSync, {
    detail: {
      tags: ["repo"],
      summary: "Sync repositories",
    },
  })
  .get("/find-many", repoFindMany, {
    query: t.Optional(
      t.Object({
        page: t.Number({ default: 1 }),
        per_page: t.Number({ default: 10 }),
      })
    ),
    detail: {
      tags: ["repo"],
      summary: "Find many repositories",
    },
  })
  .get("/search", gitRepoSearch, {
    query: t.Optional(
      t.Object({
        q: t.String(),
        page: t.Number({ default: 1 }),
        per_page: t.Number({ default: 10 }),
      })
    ),
    detail: {
      tags: ["repo"],
      summary: "Search repositories",
    },
  });

const Branch = new Elysia({
  prefix: "/branch",
}).get("/sync", gitBranchSync, {
  query: t.Object({
    repoId: t.Required(t.String()),
  }),
  detail: {
    tags: ["branch"],
    summary: "Sync branches",
  },
});

const ApiGit = new Elysia({
  prefix: "/git",
})
  .use(Repo)
  .use(Branch);

export default ApiGit;
