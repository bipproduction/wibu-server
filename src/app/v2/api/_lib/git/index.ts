import Elysia, { t } from "elysia";
import gitRepoSync from "./repo/sync";
import repoFindMany from "./repo/find-many";
import gitBranchSync from "./branch/sync";
import repoFindUniq from "./repo/find-uniq";
import gitBranchFindMany from "./branch/find-many";
import gitShaSync from "./sha/sync";
import gitShaFindMany from "./sha/find-many";

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
        q: t.String({ default: "" }),
        page: t.Number({ default: 1, minimum: 1 }),
        per_page: t.Number({ default: 10, minimum: 1, maximum: 100 }),
      })
    ),
    detail: {
      tags: ["repo"],
      summary: "Find many repositories",
    },
  })
  .get("/find-uniq", repoFindUniq, {
    query: t.Object({
      repoId: t.Required(t.String()),
    }),
    detail: {
      tags: ["repo"],
      summary: "Find repository",
    },
  });

const Branch = new Elysia({
  prefix: "/branch",
})
  .get("/sync", gitBranchSync, {
    query: t.Object({
      repoId: t.Required(t.String()),
    }),
    detail: {
      tags: ["branch"],
      summary: "Sync branches",
    },
  })
  .get("/find-many", gitBranchFindMany, {
    query: t.Optional(
      t.Object({
        repoId: t.String(),
        q: t.String({ default: "" }),
        page: t.Number({ default: 1, minimum: 1 }),
        per_page: t.Number({ default: 10, minimum: 1, maximum: 100 }),
      })
    ),
    detail: {
      tags: ["branch"],
      summary: "Find many branches with pagination and search",
    },
  });

const Sha = new Elysia({
  prefix: "/sha",
})
  .get("/sync", gitShaSync, {
    query: t.Object({
      repoId: t.Required(t.String()),
      branchId: t.Required(t.String()),
    }),
    detail: {
      tags: ["sha"],
      summary: "Sync shas",
    },
  })
  .get("/find-many", gitShaFindMany, {
    query: t.Optional(
      t.Object({
        repoId: t.String(),
        branchId: t.String(),
        page: t.Number({ default: 1, minimum: 1 }),
        per_page: t.Number({ default: 10, minimum: 1, maximum: 100 }),
      })
    ),
    detail: {
      tags: ["sha"],
      summary: "Find many shas with pagination and search",
    },
  });

const ApiGit = new Elysia({
  prefix: "/git",
})
  .use(Repo)
  .use(Branch)
  .use(Sha);

export default ApiGit;
