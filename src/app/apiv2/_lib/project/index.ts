import Elysia, { t } from "elysia";
import { projectCreate } from "./create";
import { projectList } from "./list";

const Project = new Elysia({
  prefix: "/project",
  tags: ["Project"],
})
  .post("/create", projectCreate, {
    body: t.Object({
      name: t.String(),
      full_name: t.String(),
      branch: t.String(),
      push: t.Boolean(),
      seed: t.Boolean(),
      build: t.Boolean(),
      environment: t.Array(
        t.Object({
          key: t.String(),
          value: t.String(),
        })
      ),
    }),
  })
  .get("/list", projectList, {
    query: t.Object({
      page: t.Optional(t.String()),
      per_page: t.Optional(t.String()),
    }),
  });

export type ProjectCreateBody =
  (typeof Project)["_routes"]["project"]["create"]["post"]["body"];

export default Project;
