/* eslint-disable @typescript-eslint/no-explicit-any */
import { proxy } from "valtio";
import { Prisma } from "@prisma/client";
import V2ApiFetch from "../../_lib/v2-api-fetch";

type FIND_UNIQUE = Prisma.ProjectEnvironmentGetPayload<{
  select: { id: true; name: true; branch: true; projectId: true };
}> | null;

const environmentState = proxy({
  findMany: {
    loading: false,
    data: null as
      | Prisma.ProjectEnvironmentGetPayload<{
          select: { id: true; name: true; branch: true; projectId: true };
        }>[]
      | null,
    load: async ({ projectId }: { projectId: string }) => {
      try {
        environmentState.findMany.loading = true;
        const { data, status } =
          await V2ApiFetch.v2.api.environment.findMany.get({
            query: {
              projectId,
            },
          });
        if (status === 200) {
          environmentState.findMany.data = data?.data || [];
        }
      } catch (error) {
        console.log(error);
      } finally {
        environmentState.findMany.loading = false;
      }
    },
  },
  findFirst: {
    loading: false,
    data: null as Prisma.ProjectEnvironmentGetPayload<{
      select: { id: true; name: true; branch: true; projectId: true };
    }> | null,
    load: async ({ projectId, name }: { projectId: string; name: string }) => {
      try {
        environmentState.findFirst.loading = true;
        const { data, status } =
          await V2ApiFetch.v2.api.environment.findFirst.get({
            query: {
              projectId,
              name,
            },
          });
        if (status === 200) {
          environmentState.findFirst.data = (data?.data as any) || null;
        }
      } catch (error) {
        console.log(error);
      } finally {
        environmentState.findFirst.loading = false;
      }
    },
  },
  findUnique: {
    loading: false,
    data: null as Prisma.ProjectEnvironmentGetPayload<{
      select: { id: true; name: true; branch: true; projectId: true };
    }> | null,
    load: async ({ environmentId }: { environmentId: string }): FIND_UNIQUE => {
      try {
        environmentState.findUnique.loading = true;
        const { data, status } =
          await V2ApiFetch.v2.api.environment.findUnique.get({
            query: {
              environmentId,
            },
          });
        if (status === 200) {
          environmentState.findUnique.data = (data?.data as any) || null;
          return (data?.data as any) || {};
        }
        return {};
      } catch (error) {
        console.log(error);
      } finally {
        environmentState.findUnique.loading = false;
      }
    },
  },
});

export default environmentState;
