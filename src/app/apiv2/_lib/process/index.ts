import Elysia, { t } from "elysia";
import processList from "./list";
import processByPort from "./by-port";
import processSync from "./sync";
import processFindUniq from "./find-uniq";
const Process = new Elysia({ prefix: "/process" })
  .get("/list", processList)
  .get("/by-port/:port", processByPort)
  .post("/sync", processSync)
  .get("/find-uniq", processFindUniq, {
    query: t.Object({
      name: t.String(),
    }),
  });

export default Process;
