import Elysia, { HTTPMethod } from "elysia";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import ApiProject from "../_lib/project";
import ApiGit from "../_lib/git";
import ApiEnvironment from "../_lib/environment";
import ApiConfig from "../_lib/config";
const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] as HTTPMethod[],
  allowedHeaders: "*",
  exposedHeaders: "*",
  maxAge: 5,
  credentials: true,
};

const V2Api = new Elysia({
  prefix: "/v2/api",
})
  .use(swagger({ path: "/docs" }))
  .use(cors(corsConfig))
  .use(ApiProject)
  .use(ApiGit)
  .use(ApiEnvironment)
  .use(ApiConfig);

export const GET = V2Api.handle;
export const POST = V2Api.handle;
export const PATCH = V2Api.handle;
export const DELETE = V2Api.handle;
export const PUT = V2Api.handle;

export type V2Api = typeof V2Api;
