import Elysia, { t } from "elysia";
import projectFindMany from "./find-many";
import projectCreate from "./create";

const ApiProject = new Elysia({
  prefix: "/project",
  detail: {
    tags: ["Project"],
  },
})
  .get("/find-many", projectFindMany, {
    detail: {
      summary: "Find many projects",
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
    }
  });

export default ApiProject;

export type V2ProjectCreateBody =
  typeof ApiProject._routes.project.create.post.body;
