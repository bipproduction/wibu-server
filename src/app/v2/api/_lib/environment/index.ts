import Elysia, { t } from "elysia";
import projectEnvironmentFindMany from "./findMany";
import projectEnvironmentFindFirst from "./findFirst";
import projectEnvironmentFindUniq from "./findUniq";

const ApiEnvironment = new Elysia({
  prefix: "/environment",
  detail: {
    tags: ["Environment"],
  },
})
  .get("/findMany", projectEnvironmentFindMany, {
    query: t.Object({
      projectId: t.Required(t.String()),
    }),
    detail: {
      summary: "Find project environments",
    },
  })
  .get("/findFirst", projectEnvironmentFindFirst, {
    query: t.Object({
      projectId: t.Required(t.String()),
      name: t.Required(t.String()),
    }),
    detail: {
      summary: "Find project environment",
    },
  })
  .get("/findUnique", projectEnvironmentFindUniq, {
    query: t.Object({
      environmentId: t.Required(t.String()),
    }),
    detail: {
      summary: "Find project environment by id",
    },
  });

export default ApiEnvironment;

export type TypeApiEnvironmentFindMany =
  typeof ApiEnvironment._routes.environment.findMany.get.query;
export type TypeApiEnvironmentFindFirst =
  typeof ApiEnvironment._routes.environment.findFirst.get.query;
export type TypeApiEnvironmentFindUnique =
  typeof ApiEnvironment._routes.environment.findUnique.get.query;
