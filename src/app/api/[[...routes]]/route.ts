import cors, { HTTPMethod } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import configExample from "./_lib/config/config-example";
import configJson from "./_lib/config/config-json";
import configList from "./_lib/config/config-list";
import configText from "./_lib/config/config-text";
import configUpload from "./_lib/config/config-upload";
import processList from "./_lib/process/process-list";
import serverConfig from "./_lib/server/server-config";
import editServer from "./_lib/server/server-edit";
import configDelete from "./_lib/config/config-delete";
import getVersion from "./_lib/version";
import { table } from "table";
import _ from "lodash";
import configRun from "./_lib/config/config-run";
import processRestart from "./_lib/process/process-restart";
import processReload from "./_lib/process/process-reload";
import processStop from "./_lib/process/process-stop";
import processRemove from "./_lib/process/process-remove";
import configCreate from "./_lib/config/config-create";

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
    const dataString = _.map(config.data.wibuDev.subdomains, (obj) =>
      _.values(obj).map(String)
    );
    const wibudev = table(dataString);
    return {
      data: wibudev,
    };
  })
  .get("/table-muku", async () => {
    const config = await serverConfig();
    const dataString = _.map(config.data.muku.subdomains, (obj) =>
      _.values(obj).map(String)
    );
    const muku = table(dataString);
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
    try {
      const process = await processList();
      const dataString = _.map(process.data, (obj) =>
        _.values(obj).map(String)
      );
      const t = table(dataString);
      return {
        data: t,
      };
    } catch (error) {
      console.error(error);
      return {
        data: "",
      };
    }
  })
  .post("/restart/:namespace", async ({ params }) => {
    return await processRestart(params);
  })
  .post("/reload/:namespace", async ({ params }) => {
    return await processReload(params);
  })
  .post("/stop/:namespace", async ({ params }) => {
    return await processStop(params);
  })
  .post("/remove/:namespace", async ({ params }) => {
    return await processRemove(params);
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
    const config = await configText(params);
    set.headers["Content-Type"] = "text/plain";
    return config;
  })
  .get("/config-example", async ({ set }) => {
    const config = await configExample();
    set.headers["Content-Type"] = "text/plain";
    return config.toString();
  })
  .post("/config-run/:name", configRun)
  .post("/config-create", configCreate, {
    body: t.Object({
      name: t.String(),
      text: t.String(),
    }),
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
