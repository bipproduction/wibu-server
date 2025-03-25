import cors, { HTTPMethod } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import configExample from "./_lib/etc/config-example";
import configJson from "./_lib/etc/config-json";
import configList from "./_lib/etc/config-list";
import configText from "./_lib/etc/config-text";
import configUpload from "./_lib/etc/config-upload";
import processList from "./_lib/process/process-list";
import serverConfig from "./_lib/server/server-config";
import editServer from "./_lib/server/server-edit";
import configDelete from "./_lib/etc/config-delete";
import getVersion from "./_lib/version";

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

const Etc = new Elysia({
  prefix: "/etc",
  tags: ["Etc"],
})
  .delete(
    "/config-delete/:name",
    async ({ params }) => {
      return await configDelete(params);
    },
    {
      params: t.Object({
        name: t.String(),
      }),
    }
  )
  .post(
    "/config-upload",
    async ({ body }) => {
      return await configUpload({ body });
    },
    {
      body: t.Object({
        file: t.File(),
        name: t.String(),
      }),
    }
  )
  .get("/config-list", async () => {
    const list = await configList();
    return {
      data: list,
    };
  })
  .get("/config-table", async () => {
    const list = await configList();
    const table = Bun.inspect.table(list);
    return {
      data: table,
    };
  })
  .get("/config-json/:name", async ({ params }) => {
    try {
      const config = await configJson(params);
      return config;
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        body: {
          message: "Internal Server Error",
        },
      };
    }
  })
  .get("/config-text/:name", async ({ params, set }) => {
    try {
      const config = await configText(params);
      set.headers["Content-Type"] = "text/plain";
      return config.toString();
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        body: {
          message: "Internal Server Error",
        },
      };
    }
  })
  .get("/config-example", async ({ set }) => {
    const config = await configExample();
    set.headers["Content-Type"] = "text/plain";
    return config.toString();
  });

const ApiServer = new Elysia({
  prefix: "/api",
  tags: ["Server", "Process"],
})
  .use(swagger({ path: "/docs" }))
  .use(cors(corsConfig))
  .use(Server)
  .use(Process)
  .use(Etc)
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
