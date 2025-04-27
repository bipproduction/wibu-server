import Elysia, { t } from "elysia";
import configFindMany from "./findMany";
import configFindUniq from "./findUniq";

const ApiConfig = new Elysia({
  prefix: "/config",
  detail: {
    tags: ["Config"],
  },
}).get("/findMany", configFindMany, {
  query: t.Optional(
    t.Object({
      projectEnvironmentId: t.String(),
    })
  ),
  detail: {
    summary: "Find many configs",
  },
})
.get("/findUnique", configFindUniq, {
  query: t.Optional(
    t.Object({
      projectEnvironmentId: t.String(),
    })
  ),
  detail: {
    summary: "Find unique config",
  },
});

export default ApiConfig;

export type TypeApiConfigFindMany =
  typeof ApiConfig._routes.config.findMany.get.query;
export type TypeApiConfigFindUnique =
  typeof ApiConfig._routes.config.findUnique.get.query;
