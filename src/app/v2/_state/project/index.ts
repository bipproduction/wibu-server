/* eslint-disable @typescript-eslint/no-explicit-any */
import { proxy } from "valtio";
import environmentState from "./environment";
import { Prisma } from "@prisma/client";
import V2ApiFetch from "../../_lib/v2-api-fetch";
import { V2ProjectCreateBody } from "../../api/_lib/project";
import { toast } from "react-toastify";
import configState from "../config";


const findMany = proxy({
    loading: false,
    q: "",
    data: null as
      | Prisma.ProjectsGetPayload<{ omit: { isActive: true } }>[]
      | null,
    load: async () => {
      try {
        findMany.loading = true;
        const { data, status } = await V2ApiFetch.v2.api.project.findMany.get(
          {
            query: {
              q: findMany.q,
            },
          }
        );
        if (status === 200) {
          findMany.data = data?.data || [];
        }
      } catch (error) {
        console.log(error);
      } finally {
        findMany.loading = false;
      }
    },
  });
  
  const findUniq = proxy({
    loading: false,
    data: null as Prisma.ProjectsGetPayload<{
      omit: { isActive: true };
      include: { repos: true };
    }> | null,
    load: async (projectId: string) => {
      try {
        findUniq.loading = true;
        const { data, status } = await V2ApiFetch.v2.api.project.findUniq.get(
          {
            query: { projectId },
          }
        );
        if (status === 200) {
          findUniq.data = (data?.data as any) || null;
        }
      } catch (error) {
        console.log(error);
      } finally {
        findUniq.loading = false;
      }
    },
  });
  
  const form: V2ProjectCreateBody = {
    name: "",
    full_name: "",
    build: true,
    push: true,
    seed: true,
    projectEnvironment: {
      name: "production",
      branch: "main",
    },
    env: {},
    instance: 1,
    reposId: "",
  };
  
  const create = proxy({
    loading: false,
    form: form,
    submit: async () => {
      try {
        create.loading = true;
        const { error } = await V2ApiFetch.v2.api.project.create.post(
          create.form
        );
        if (error) {
          console.log(JSON.stringify(error, null, 2));
          toast.error(error.value.message);
          return;
        }
        create.form = form;
        findMany.load();
        toast.success("Project created successfully");
      } catch (error) {
        console.log(error);
      } finally {
        create.loading = false;
      }
    },
  });
  
const v2ProjectState = proxy({
    findMany,
    findUniq,
    create,
    environment: environmentState,
    config: configState,
  });
  
  export default v2ProjectState;