import Elysia, { t } from "elysia";
import gitBranchSync from "./sync";
import gitBranchFindMany from "./findMany";

const ApiBranch = new Elysia({
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
  .get("/findMany", gitBranchFindMany, {
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

export default ApiBranch;
