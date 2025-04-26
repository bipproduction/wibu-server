"use client";
import { z } from "zod";
import V2ClientRouter from "../_lib/v2-client-router";

const Project = new V2ClientRouter({ prefix: "/project" }).add("/", {
  query: z.object({
    action: z.enum(["no-action", "create", "update", "detail"]),
    projectId: z.string().optional(),
  }),
});

const Git = new V2ClientRouter({ prefix: "/git" }).add("/", {
  query: z.object({
    action: z.enum(["no-action", "create", "update", "detail"]),
    repoId: z.string().optional(),
  }),
});

const Settings = new V2ClientRouter({ prefix: "/settings" }).add("/", {
  query: z.object({
    action: z.enum(["no-action", "create", "update", "detail"]),
    settingId: z.string().optional(),
  }),
});

const Domains = new V2ClientRouter({ prefix: "/domains" }).add("/", {
  query: z.object({
    action: z.enum(["no-action", "create", "update", "detail"]),
    domainId: z.string().optional(),
  }),
});

const Processes = new V2ClientRouter({ prefix: "/process" }).add("/", {
  query: z.object({
    action: z.enum(["no-action", "create", "update", "detail"]),
    processId: z.string().optional(),
  }),
});

const DashboardRouter = new V2ClientRouter({ prefix: "/dashboard" })
  .add("/")
  .use("project", Project)
  .use("git", Git)
  .use("settings", Settings)
  .use("domains", Domains)
  .use("process", Processes);

const V2Router = new V2ClientRouter({ prefix: "/v2" }).use(
  "dashboard",
  DashboardRouter
);

export default V2Router;
