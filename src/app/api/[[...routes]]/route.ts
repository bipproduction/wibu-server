import { auth } from "@/lib/auth";
import authView from "@/lib/auth-view";
import cors, { HTTPMethod } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import configCreate from "./_lib/config/config-create";
import configDelete from "./_lib/config/config-delete";
import configExample from "./_lib/config/config-example";
import configJson from "./_lib/config/config-json";
import configList from "./_lib/config/config-list";
import configLog from "./_lib/config/config-log";
import configRun from "./_lib/config/config-run";
import { configScreenshot } from "./_lib/config/config-screenshoot";
import configText from "./_lib/config/config-text";
import configUpload from "./_lib/config/config-upload";
import processLog from "./_lib/process/precess-log";
import { processItem } from "./_lib/process/process-item";
import processList from "./_lib/process/process-list";
import processReload from "./_lib/process/process-reload";
import processRemove from "./_lib/process/process-remove";
import processRestart from "./_lib/process/process-restart";
import processStop from "./_lib/process/process-stop";
import projectList from "./_lib/projects/project-list";
import projectNamespace from "./_lib/projects/project-namespace";
import projectReleases from "./_lib/projects/project-releases";
import projectReleasesAssign from "./_lib/projects/project-releases-assign";
import serverAdd from "./_lib/server/server-add";
import serverConfig from "./_lib/server/server-config";
import serverEdit from "./_lib/server/server-edit";
import { serverReload } from "./_lib/server/server-reload";
import serverRemove from "./_lib/server/server-remove";
import { getSession } from "./_lib/user/get-session";
import getVersion from "./_lib/version";
import buildLog from "./_lib/webhook/build-log";
import { workflowActionList } from "./_lib/workflows/workflows-action-list";
import { workflowsGet } from "./_lib/workflows/workflows-get";
import { workflowsGetRun } from "./_lib/workflows/workflows-get-run";
import { workflowsList } from "./_lib/workflows/workflows-list";
import { workflowsListRun } from "./_lib/workflows/workflows-list-run";
import { workflowsLog } from "./_lib/workflows/workflow-log";
import { animeList } from "./_lib/utils/anime-list";
// import { userMiddleware } from "@/middlewares/auth-middleware";

const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] as HTTPMethod[],
  allowedHeaders: "*",
  exposedHeaders: "*",
  maxAge: 5,
  credentials: true,
};

const Server = new Elysia({
  prefix: "/server",
  tags: ["Server"],
})
  .get("/server-config", serverConfig)
  .get("/table-wibudev", serverConfig)
  .get("/table-muku", serverConfig)
  .post("/server-edit", serverEdit)
  .post("/server-add", serverAdd)
  .post("/server-remove", serverRemove)
  .post("/server-reload", serverReload);

const Process = new Elysia({
  prefix: "/process",
  tags: ["Process"],
})
  .get("/list", processList)
  .post("/restart/:namespace", processRestart)
  .post("/reload/:namespace", processReload)
  .post("/stop/:namespace", processStop)
  .post("/remove/:namespace", processRemove)
  .get("/log/:name/:lines", processLog)
  .get("/item/:name", processItem);

const Config = new Elysia({
  prefix: "/config",
  tags: ["Config"],
})
  .delete("/config-delete/:name", configDelete)
  .post("/config-upload", configUpload)
  .get("/config-list", configList)
  .get("/config-json/:name", configJson)
  .get("/config-text/:name", configText)
  .get("/screenshot/:name/:namespace", configScreenshot) // TODO: remove i
  .get("/config-example", configExample)
  .post("/config-run/:name", configRun)
  .post("/config-create", configCreate)
  .all("/config-log/*", configLog);

const Projects = new Elysia({
  prefix: "/projects",
  tags: ["Projects"],
})
  .get("/list", projectList)
  .get("/namespace/:name", projectNamespace)
  .get("/releases/:name/:namespace", projectReleases)
  .post("/releases-assign/:name/:namespace/:release", projectReleasesAssign);

const Webhook = new Elysia({
  prefix: "/webhook",
  tags: ["Webhook"],
}).post("/build-log", buildLog);

const Auth = new Elysia({
  prefix: "/auth",
  tags: ["Auth"],
}).all("/*", authView);

const User = new Elysia({
  prefix: "/user",
  tags: ["User"],
}).get("/session", getSession);

const Util = new Elysia({
  prefix: "/util",
  tags: ["Util"],
})
  .get("/origin", (c) => {
    const origin = new URL(c.request.url).origin;
    return { origin };
  })
  .get("/anime-list", animeList);

const WorkFlows = new Elysia({
  prefix: "/workflows",
  tags: ["Workflows"],
})
  .get("/list", workflowsList)
  .get("/get/:workflow_id", workflowsGet)
  .get("/action-list", workflowActionList)
  .get("/list-run", workflowsListRun)
  .get("/list-run/:run_id", workflowsGetRun)
  .get("/log/:run_id/:attempt_number", workflowsLog);

const ApiServer = new Elysia({
  prefix: "/api",
})
  .use(swagger({ path: "/docs" }))
  .use(cors(corsConfig))
  .use(Auth)
  .get("/", () => {
    return {
      online: true,
    };
  })
  .onBeforeHandle(async (c) => {
    const session = await auth.api.getSession({ headers: c.request.headers });
    if (!session?.user) {
      return {
        success: false,
        message: "Unauthorized Access: Token is missing",
      };
    }
  })
  .use(Server)
  .use(Process)
  .use(Config)
  .use(Projects)
  .use(Webhook)
  .use(User)
  .use(Util)
  .use(WorkFlows)
  .onError(({ code }) => {
    if (code === "NOT_FOUND") {
      return {
        status: 404,
        body: "Route not found :(",
      };
    }
  })
  .get("/version", getVersion, { tags: ["Server"] });

export const GET = ApiServer.handle;
export const POST = ApiServer.handle;
export const PATCH = ApiServer.handle;
export const DELETE = ApiServer.handle;
export const PUT = ApiServer.handle;

export type AppServer = typeof ApiServer;
