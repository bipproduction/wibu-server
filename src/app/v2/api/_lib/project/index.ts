import Elysia, { t } from "elysia";
import projectFindMany from "./find-many";
import projectCreate from "./create";
import projectFindUniq from "./find-uniq";
import projectEnvironmentFindMany from "./environment/find-many";
import projectEnvironmentFindFirst from "./environment/find-first";

const ApiProject = new Elysia({
  prefix: "/project",
  detail: {
    tags: ["Project"],
  },
})
  .get("/find-many", projectFindMany, {
    query: t.Optional(
      t.Object({
        q: t.String({ default: "" }),
        page: t.Number({ default: 1, minimum: 1 }),
        per_page: t.Number({ default: 10, minimum: 1, maximum: 100 }),
      })
    ),
    detail: {
      summary: "Find many projects",
    },
  })
  .get("/find-uniq", projectFindUniq, {
    query: t.Object({
      projectId: t.Required(t.String()),
    }),
    detail: {
      summary: "Find project",
    },
  })
  .get("/environment-find-many", projectEnvironmentFindMany, {
    query: t.Object({
      projectId: t.Required(t.String()),
    }),
    detail: {
      summary: "Find project environments",
    },
  })
  .get("/environment-find-first", projectEnvironmentFindFirst, {
    query: t.Object({
      projectId: t.Required(t.String()),
      name: t.Required(t.String()),
    }),
    detail: {
      summary: "Find project environment",
    },
  })
  .post("/create", projectCreate, {
    body: t.Object({
      name: t.String(),
      full_name: t.String(),
      build: t.Boolean({ default: false }),
      push: t.Boolean({ default: false }),
      seed: t.Boolean({ default: false }),
      projectEnvironment: t.Object({
        name: t.String(),
        branch: t.String(),
      }),
      env: t.Object({}),
      instance: t.Number(),
      reposId: t.String(),
    }),
    detail: {
      summary: "Create project",
    },
  });

export default ApiProject;

export type V2ProjectCreateBody =
  typeof ApiProject._routes.project.create.post.body;
