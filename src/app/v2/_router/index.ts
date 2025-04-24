"use client";
import { z } from "zod";
import V2ClientRouter from "../_lib/v2-client-router";

const Project = new V2ClientRouter({ prefix: "/project" }).add("/", {
  query: z.object({
    action: z.enum(["no-action", "create", "update", "detail"]),
    projectId: z.string().optional(),
  }),
});

const Git = new V2ClientRouter({ prefix: "/git" }).add("/");

const DashboardRouter = new V2ClientRouter({ prefix: "/dashboard" })
  .add("/")
  .use("project", Project)
  .use("git", Git);

const V2Router = new V2ClientRouter({ prefix: "/v2" }).use(
  "dashboard",
  DashboardRouter
);

export default V2Router;
