/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiV2Fetch from "@/lib/apiv2-fetch";
import { Prisma } from "@prisma/client";
import { toast } from "react-toastify";
import { proxy } from "valtio";
import Routes from "../_routes";
// import projectRoutes from "../_routes/project";

const environtment = proxy({
  create: {
    form: {
      projectId: "",
      instance: 1,
      environment: {
        name: "",
        branch: "",
      },
      env: [] as { key: string; value: string }[],
      previewUrl: null as string | null,
    },
    loading: false,
    async submit() {
      const { data } = await ApiV2Fetch.apiv2.project[
        "environment-create"
      ].post({
        env: environtment.create.form.env,
        projectId: environtment.create.form.projectId,
        environment: environtment.create.form.environment,
        instance: environtment.create.form.instance,
        previewUrl: environtment.create.form.previewUrl || "",
      });
      if (!data || !data.success) return toast.error(data?.message);
      toast.success(data.message);
      window.location.href = Routes.routes.project.detail.query({
        projectId: environtment.create.form.projectId,
      });
    },
  },
  update: {
    form: {
      environmentId: "",
      instance: 1,
      environment: {
        name: "",
        branch: "",
      },
      env: [] as { key: string; value: string }[],
      previewUrl: null as string | null,
    },
    loading: false,
    async submit() {
      console.log(
        JSON.stringify(stateProject.environtment.update.form, null, 2)
      );
    },
  },
  findMany: {
    data: null as
      | Prisma.ProjectEnvironmentGetPayload<{
          include: {
            env: true;
            config: true;
          };
        }>[]
      | null,
    async load({ projectId }: { projectId: string }) {
      const { data } = await ApiV2Fetch.apiv2.project.environment[
        "find-many-include"
      ]({
        projectId,
      }).get();
      stateProject.environtment.findMany.data = data?.data || ([] as any);
    },
  },
  findUniq: {
    data: null as
      | Prisma.ProjectEnvironmentGetPayload<{
          include: {
            env: true;
            config: true;
          };
        }> | null,
    async load({ environmentId }: { environmentId: string }) {
      const { data } = await ApiV2Fetch.apiv2.project.environment["find-uniq"]({
        environmentId,
      }).get();
      stateProject.environtment.findUniq.data = data?.data || ({} as any);
    },
  },
});

const project = proxy({
  list: {
    data: null as any[] | null,
    async load() {
      const { data } = await ApiV2Fetch.apiv2.project.list.get({ query: {} });
      this.data = data?.data || [];
    },
    async search(q: string) {},
  },
  create: {
    form: {
      name: "" as string,
      full_name: "" as string,
      push: false,
      seed: false,
      build: true,
      instance: 1,
      environment: {
        name: "production" as string,
        branch: "main" as string,
      },
      env: {} as Record<string, string>,
      previewUrl: null as string | null,
    },
    loading: false,
    async submit() {

      try {
        project.create.loading = true;
        if (!project.create.form.name || !project.create.form.full_name)
          return toast.error("Project name and full name are required");

        const { data } = await ApiV2Fetch.apiv2.project.create.post(
          project.create.form
        );
        if (!data || !data.success) return toast.error(data?.message);
        toast.success(data.message);
        if (data.data?.id) {
          // window.location.href = projectRoutes.detail.build({
          //   projectId: data.data.id,
          // });
          window.location.href = Routes.routes.project.detail.query({
            projectId: data.data.id,
          });
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        project.create.loading = false;
      }
    },
  },
  getProject: {
    data: null as Prisma.ProjectsGetPayload<{
      omit: {
        updatedAt: true;
      };
    }> | null,
    async load({ id }: { id: string }) {
      const { data } = await ApiV2Fetch.apiv2.project["get-project"]({
        id,
      }).get();
      project.getProject.data = data?.data || ({} as any);
      project.getEnvironment.load({ projectId: id });
    },
  },

  getEnvironment: {
    data: null as
      | Prisma.ProjectEnvironmentGetPayload<{
          include: {
            env: true;
            config: true;
          };
        }>[]
      | null,
    async load({ projectId }: { projectId: string }) {
      const { data } = await ApiV2Fetch.apiv2.project.environment[
        "find-many-include"
      ]({
        projectId,
      }).get();
      project.getEnvironment.data = data?.data || ([] as any);
    },
  },
  getEnvironmentDetail: {
    data: null as Prisma.ProjectEnvironmentGetPayload<{
      include: {
        env: true;
        config: true;
      };
    }> | null,
    async load({ environmentId }: { environmentId: string }) {
      const { data } = await ApiV2Fetch.apiv2.project.environment["find-uniq"]({
        environmentId,
      }).get();
      project.getEnvironmentDetail.data = data?.data || ({} as any);
    },
  },
  delete: {
    async soft({ id }: { id: string }) {
      const { data } = await ApiV2Fetch.apiv2.project["delete-soft"]({
        id,
      }).delete();
      if (!data || !data.success) return toast.error(data?.message);
      toast.success(data.message);
      window.location.href = "/dashboard";
    },
    async hard({ id }: { id: string }) {
      const { data } = await ApiV2Fetch.apiv2.project["delete-hard"]({
        id,
      }).delete();
      if (!data || !data.success) return toast.error(data?.message);
      toast.success(data.message);
      window.location.href = "/dashboard";
    },
  },
});

const stateProject = proxy({
  project,
  environtment,
});

export default stateProject;
