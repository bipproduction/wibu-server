import cors, { HTTPMethod } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import processList from "./_lib/process/process-list";
import serverConfig from "./_lib/server/server-config";

const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] as HTTPMethod[],
  allowedHeaders: "*",
  exposedHeaders: "*",
  maxAge: 5,
  credentials: true,
};

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
  .group("/api", (app) =>
    app
      .group("server", app => app.get("/config", async () => {
        const config = await serverConfig();
        return new Response(JSON.stringify(config), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      })
        .get("config-table-wibudev", async () => {
          const config = await serverConfig()
          const wibudev = Bun.inspect.table(config.data.wibuDev.subdomains)
          return new Response(wibudev, {
            headers: {
              "Content-Type": "text/plain",
            },
          })
        })
        .get("config-table-muku", async () => {
          const config = await serverConfig()
          const muku = Bun.inspect.table(config.data.muku.subdomains)
          return new Response(muku, {
            headers: {
              "Content-Type": "text/plain",
            },
          })
        }))
      .group("/process", (app) =>
        app
          .get("/list", async () => {
            const process = await processList();
            return new Response(JSON.stringify(process), {
              headers: {
                "Content-Type": "application/json",
              },
            });
          })
         .get("/list-table", async () => {
            const process = await processList();
            const table = Bun.inspect.table(process.data)
            return new Response(table, {
              headers: {
                "Content-Type": "text/plain",
              },
            });
          })
      )
  );

export const GET = ApiServer.handle;
export const POST = ApiServer.handle;
export const PATCH = ApiServer.handle;
export const DELETE = ApiServer.handle;
export const PUT = ApiServer.handle;

export type AppServer = typeof ApiServer;
