/* eslint-disable @typescript-eslint/no-explicit-any */
import { proxy } from "valtio";
import V2ApiFetch from "../../_lib/v2-api-fetch";
import { toast } from "react-toastify";
import { Prisma } from "@prisma/client";

const branchState = proxy({
    sync: {
      loading: false,
      submit: async (repoId: string) => {
        try {
          branchState.sync.loading = true;
          const { data } = await V2ApiFetch.v2.api.git.branch["sync"].get({
            query: { repoId },
          });
          toast.success(`Successfully synced branches [${data?.data}] branches`);
          branchState.findMany.load({ repoId });
        } catch (error) {
          console.log(error);
          throw new Error("Failed to sync branches");
        } finally {
          branchState.sync.loading = false;
        }
      },
    },
    findMany: {
      loading: false,
      q: "",
      data: null as
        | Prisma.BranchesGetPayload<{
            select: { id: true; name: true; repoId: true; sha: true };
          }>[]
        | null,
      load: async ({ repoId }: { repoId: string }) => {
        try {
          branchState.findMany.loading = true;
          const { data, status } = await V2ApiFetch.v2.api.git.branch.findMany.get({
            query: { q: branchState.findMany.q, repoId },
          });
          if (status === 200) {
            branchState.findMany.data = (data?.data as any) || [];
          }
        } catch (error) {
          console.log(error);
        } finally {
          branchState.findMany.loading = false;
        }
      },
    },
  });

  export default branchState;