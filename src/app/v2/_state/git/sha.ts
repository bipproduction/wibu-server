/* eslint-disable @typescript-eslint/no-explicit-any */
import { proxy } from "valtio";
import { toast } from "react-toastify";
import { Prisma } from "@prisma/client";
import V2ApiFetch from "../../_lib/v2-api-fetch";

const shaState = proxy({
    sync: {
      repoId: null as string | null,
      branchId: null as string | null,
      loading: false,
      submit: async () => {
        try {
          shaState.sync.loading = true;
          if (!shaState.sync.repoId || !shaState.sync.branchId) {
            toast.error("Missing repoId or branchId");
            return;
          }
          const { data } = await V2ApiFetch.v2.api.git.sha["sync"].get({
            query: { repoId: shaState.sync.repoId, branchId: shaState.sync.branchId },
          });
          toast.success(`Successfully synced shas [${data?.data}] shas`);
          shaState.sync.loading = false;
          shaState.findMany.load();
        } catch (error) {
          console.log(error);
          throw new Error("Failed to sync shas");
        } finally {
          shaState.sync.loading = false;
        }
      },
    },
    findMany: {
      loading: false,
      repoId: null as string | null,
      branchId: null as string | null,
      data: null as
        | Prisma.ShaGetPayload<{
            select: { id: true; name: true; repoId: true; branchId: true, json: true };
          }>[]
        | null,
      load: async () => {
        try {
          if (!shaState.findMany.repoId || !shaState.findMany.branchId) {
            toast.error("Missing repoId or branchId");
            return;
          }
          shaState.findMany.loading = true;
          const { data, status } = await V2ApiFetch.v2.api.git.sha.findMany.get({
            query: {
              repoId: shaState.findMany.repoId,
              branchId: shaState.findMany.branchId,
            },
          });
          if (status === 200) {
            shaState.findMany.data = (data?.data as any) || [];
          }
        } catch (error) {
          console.log(error);
        } finally {
          shaState.findMany.loading = false;
        }
      },
    },
  });

  export default shaState;