import Elysia, { t } from "elysia";
import repoFindMany from "./findMany";
import repoFindUniq from "./findUniq";
import gitRepoSync from "./sync";

const ApiRepo = new Elysia({
    prefix: "/repo",
  })
    .get("/sync", gitRepoSync, {
      detail: {
        tags: ["repo"],
        summary: "Sync repositories",
      },
    })
    .get("/findMany", repoFindMany, {
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
    .get("/findUniq", repoFindUniq, {
      query: t.Object({
        repoId: t.Required(t.String()),
      }),
      detail: {
        tags: ["repo"],
        summary: "Find repository",
      },
    });

export default ApiRepo;