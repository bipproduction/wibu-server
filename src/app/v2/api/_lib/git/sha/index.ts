import Elysia, { t } from "elysia";
import gitShaFindMany from "./findMany";
import gitShaSync from "./sync";

const ApiSha = new Elysia({
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
  .get("/findMany", gitShaFindMany, {
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

export default ApiSha;
