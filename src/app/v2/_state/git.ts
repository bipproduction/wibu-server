import { Prisma } from "@prisma/client";
import { proxy } from "valtio";
import V2ApiFetch from "../_lib/v2-api-fetch";
import { toast } from "react-toastify";

const repo = proxy({
  findMany: {
    loading: false,
    data: null as
      | Prisma.ReposGetPayload<{
          omit: { isActive: true };
          include: { _count: { select: { Branches: true } } };
        }>[]
      | null,
    load: async () => {
      const { data, status } = await V2ApiFetch.v2.api.git.repo[
        "find-many"
      ].get({
        query: {},
      });
      if (status === 200) {
        repo.findMany.data = data?.data || [];
      }
    },
  },
  sync: {
    loading: false,
    submit: async () => {
      try {
        repo.sync.loading = true;
        const { data } = await V2ApiFetch.v2.api.git.repo["sync"].get();
        return data;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to sync repositories");
      } finally {
        repo.sync.loading = false;
      }
    },
  },
  search: {
    loading: false,
    q: "",
    load: async () => {
      const { data, status } = await V2ApiFetch.v2.api.git.repo["search"].get({
        query: { q: repo.search.q },
      });
      if (status === 200) {
        repo.findMany.data = data?.data || [];
      }
    },
  },
});

const branch = proxy({
  sync: {
    loading: false,
    submit: async (repoId: string) => {
      try {
        branch.sync.loading = true;
        const { data } = await V2ApiFetch.v2.api.git.branch["sync"].get({
          query: { repoId },
        });
        toast.success(`Successfully synced branches [${data?.data}] branches`);
        repo.search.load();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to sync branches");
      } finally {
        branch.sync.loading = false;
      }
    },
  },
});

const V2GitState = proxy({
  repo,
  branch,
});

export default V2GitState;
