"use client";

import { z } from "zod";
import WibuRouter from "../_lib/wibu-router";

const ProcessRoute = new WibuRouter({ prefix: "/process" })
  .add("/")
  .add("/detail", { query: z.object({ name: z.string() }) });

const ProjectRoute = new WibuRouter({ prefix: "/project" })
  .add("/")
  .add("/create", {
    query: z.object({
      action: z.enum(["selectrepo", "form"]),
    }),
  })
  .add("/detail", { query: z.object({ projectId: z.string().min(1) }) })
  .add("/environment", { query: z.object({ projectId: z.string().min(1), environmentId: z.string().optional() }) })
  .add("/environment/create", { query: z.object({ projectId: z.string().min(1) }) })
  .add("/environment/update", { query: z.object({ projectId: z.string().min(1), environmentId: z.string().min(1) }) })
  .add("/config-create", { query: z.object({ projectId: z.string().min(1), environmentId: z.string().min(1) }) })
  .add("/config-edit", { query: z.object({ projectId: z.string().min(1), environmentId: z.string().min(1) }) })
  .add("/env-create", { query: z.object({ projectId: z.string().min(1), environmentId: z.string().min(1) }) })
  .add("/env-edit", { query: z.object({ projectId: z.string().min(1), environmentId: z.string().min(1) }) });

const Routes = new WibuRouter({ prefix: "/dashboard" })
  .use("project", ProjectRoute)
  .use("process", ProcessRoute);

export default Routes;
