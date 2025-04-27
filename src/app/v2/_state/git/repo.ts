/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";
import { proxy } from "valtio";
import V2ApiFetch from "../../_lib/v2-api-fetch";

const repoState = proxy({
    findMany: {
      loading: false,
      q: "",
      data: null as
        | Prisma.ReposGetPayload<{
            omit: { isActive: true };
            include: { _count: { select: { Branches: true } } };
          }>[]
        | null,
      load: async () => {
        const { data, status } = await V2ApiFetch.v2.api.git.repo.findMany.get({
          query: {
            q: repoState.findMany.q,
          },
        });
        if (status === 200) {
          repoState.findMany.data = data?.data || [];
        }
      },
    },
    find: {
      loading: false,
      data: null as Prisma.ReposGetPayload<{
        omit: { isActive: true };
        include: { _count: { select: { Branches: true } } };
      }> | null,
      load: async (repoId: string) => {
        try {
          repoState.find.loading = true;
          const { data, status } = await V2ApiFetch.v2.api.git.repo.findUniq.get({
            query: { repoId },
          });
          if (status === 200) {
            repoState.find.data = (data?.data as any) || null;
          }
        } catch (error) {
          console.log(error);
        } finally {
          repoState.find.loading = false;
        }
      },
    },
    sync: {
      loading: false,
      submit: async () => {
        try {
          repoState.sync.loading = true;
          const { data } = await V2ApiFetch.v2.api.git.repo["sync"].get();
          return data;
        } catch (error) {
          console.log(error);
          throw new Error("Failed to sync repositories");
        } finally {
          repoState.sync.loading = false;
        }
      },
    },
  });

  export default repoState;