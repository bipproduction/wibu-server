import cors, { HTTPMethod } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import processList from "./_lib/process/process-list";
import serverConfig from "./_lib/server/server-config";
import editServer from "./_lib/server/server-edit";
import build from "./_lib/build";

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
  .get("/config", async () => {
    const config = await serverConfig();
    return config;
  })
  .get("/table-wibudev", async () => {
    const config = await serverConfig();
    const wibudev = Bun.inspect.table(config.data.wibuDev.subdomains);
    return {
      data: wibudev,
    };
  })
  .get("/table-muku", async () => {
    const config = await serverConfig();
    const muku = Bun.inspect.table(config.data.muku.subdomains);
    return {
      data: muku,
    };
  })
  .post(
    "/edit-config",
    async ({ body }) => {
      const { name, data } = body;
      return await editServer(name, data);
    },
    {
      body: t.Object({
        name: t.String(),
        data: t.Array(t.Object({})),
      }),
    }
  );

const Process = new Elysia({
  prefix: "/process",
  tags: ["Process"],
})
  .get("/list", async () => {
    const process = await processList();
    return {
      data: process.data,
    };
  })
  .get("/table", async () => {
    const process = await processList();
    const table = Bun.inspect.table(process.data);
    return {
      data: table,
    };
  });

const ApiServer = new Elysia()
  .use(swagger({ path: "/api/docs" }))
  .use(cors(corsConfig))
  .onError(({ code }) => {
    if (code === "NOT_FOUND") {
      return {
        status: 404,
        body: "Route not found :(",
      };
    }
  })
  .group("/api", (app) => app.use(Server).use(Process).get("/build", build));

export const GET = ApiServer.handle;
export const POST = ApiServer.handle;
export const PATCH = ApiServer.handle;
export const DELETE = ApiServer.handle;
export const PUT = ApiServer.handle;

export type AppServer = typeof ApiServer;
