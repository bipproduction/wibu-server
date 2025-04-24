import Elysia from "elysia";
import { domainConfig } from "./config";
import syncConfig from "./sycn-config";

const Domain = new Elysia({
  prefix: "/domain",
})
  .get("/config", domainConfig)
  .post("/sync-config", syncConfig);

export default Domain;
