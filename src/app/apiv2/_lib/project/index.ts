import Elysia, { t } from "elysia";
import { projectCreate } from "./create";
import projectDeleteHard from "./delete-hard";
import projectDeleteSoft from "./delete-soft";
import { environtmentFindManyInclude } from "./environment/find-many-include";
import { getProject } from "./get-project";
import { projectList } from "./list";
import environtmentFindUniq from "./environment/find-uniq";
import { environmentCreate } from "./environment-create";
import environmentEdit from "./environment-edit";

const Environtment = new Elysia({
  prefix: "/environment",
  tags: ["Environment"],
})
  .get("/find-many-include/:projectId", environtmentFindManyInclude, {
    params: t.Object({
      projectId: t.String(),
    }),
  })
  .get("/find-uniq/:environmentId", environtmentFindUniq, {
    params: t.Object({
      environmentId: t.String(),
    }),
  });

const Project = new Elysia({
  prefix: "/project",
  tags: ["Project"],
})
  .use(Environtment)
  .post("/create", projectCreate)
  .get("/list", projectList, {
    query: t.Object({
      page: t.Optional(t.String()),
      per_page: t.Optional(t.String()),
    }),
  })
  .delete("/delete-soft/:id", projectDeleteSoft, {
    params: t.Object({
      id: t.String(),
    }),
  })
  .delete("/delete-hard/:id", projectDeleteHard, {
    params: t.Object({
      id: t.String(),
    }),
  })
  .get("/get-project/:id", getProject, {
    params: t.Object({
      id: t.String(),
    }),
  })
  .post("/environment-create", environmentCreate, {
    body: t.Object({
      projectId: t.String(),
      environment: t.Object({
        name: t.String(),
        branch: t.String(),
      }),
      env: t.Array(
        t.Object({
          key: t.String(),
          value: t.String(),
        })
      ),
      instance: t.Number(),
      previewUrl: t.String(),
    }),
  })
  .post("/environment-edit", environmentEdit, {
    body: t.Object({
      environmentId: t.String(),
      environment: t.Object({
        name: t.String(),
        branch: t.String(),
      }),
      env: t.Array(
        t.Object({
          key: t.String(),
          value: t.String(),
        })
      ),
      instance: t.Number(),
      previewUrl: t.String(),
    }),
  });

export type ProjectCreateBody =
  (typeof Project)["_routes"]["project"]["create"]["post"]["body"];

export default Project;
