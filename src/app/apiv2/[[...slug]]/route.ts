import { auth } from "@/lib/auth";
import authView from "@/lib/auth-view";
import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia, { HTTPMethod } from "elysia";
import ApiGithub from "../_lib/github";
import Project from "../_lib/project";

const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] as HTTPMethod[],
  allowedHeaders: "*",
  exposedHeaders: "*",
  maxAge: 5,
  credentials: true,
};

const Auth = new Elysia({
  prefix: "/auth",
  tags: ["Auth"],
}).all("/*", authView);

const ApiV2 = new Elysia({
  prefix: "/apiv2",
})
  .use(swagger({ path: "/docs" }))
  .use(cors(corsConfig))
  .use(Auth)
  .use(ApiGithub)
  .use(Project)
  .onBeforeHandle(async (c) => {
    const session = await auth.api.getSession({ headers: c.request.headers });
    if (!session?.user) {
      return {
        success: false,
        message: "Unauthorized Access: Token is missing",
      };
    }
  })
  .onError(({ code }) => {
    if (code === "NOT_FOUND") {
      return {
        status: 404,
        body: "Route not found :(",
      };
    }
  });

export const GET = ApiV2.handle;
export const POST = ApiV2.handle;
export const PATCH = ApiV2.handle;
export const DELETE = ApiV2.handle;
export const PUT = ApiV2.handle;

export type Apiv2 = typeof ApiV2;
