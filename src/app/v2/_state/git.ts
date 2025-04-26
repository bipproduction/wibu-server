/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";
import { toast } from "react-toastify";
import { proxy } from "valtio";
import V2ApiFetch from "../_lib/v2-api-fetch";

const repo = proxy({
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
      const { data, status } = await V2ApiFetch.v2.api.git.repo[
        "find-many"
      ].get({
        query: {
          q: repo.findMany.q,
        },
      });
      if (status === 200) {
        repo.findMany.data = data?.data || [];
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
        repo.find.loading = true;
        const { data, status } = await V2ApiFetch.v2.api.git.repo["find-uniq"].get({
          query: { repoId },
        });
        if (status === 200) {
          repo.find.data = (data?.data as any) || null;
        }
      } catch (error) {
        console.log(error);
      } finally {
        repo.find.loading = false;
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
        branch.findMany.load({ repoId });
      } catch (error) {
        console.log(error);
        throw new Error("Failed to sync branches");
      } finally {
        branch.sync.loading = false;
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
        branch.findMany.loading = true;
        const { data, status } = await V2ApiFetch.v2.api.git.branch[
          "find-many"
        ].get({
          query: { q: branch.findMany.q, repoId },
        });
        if (status === 200) {
          branch.findMany.data = (data?.data as any) || [];
        }
      } catch (error) {
        console.log(error);
      } finally {
        branch.findMany.loading = false;
      }
    },
  },
});

const sha = proxy({
  sync: {
    repoId: null as string | null,
    branchId: null as string | null,
    loading: false,
    submit: async () => {
      try {
        sha.sync.loading = true;
        if (!sha.sync.repoId || !sha.sync.branchId) {
          toast.error("Missing repoId or branchId");
          return;
        }
        const { data } = await V2ApiFetch.v2.api.git.sha["sync"].get({
          query: { repoId: sha.sync.repoId, branchId: sha.sync.branchId },
        });
        toast.success(`Successfully synced shas [${data?.data}] shas`);
        sha.sync.loading = false;
        sha.findMany.load();
      } catch (error) {
        console.log(error);
        throw new Error("Failed to sync shas");
      } finally {
        sha.sync.loading = false;
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
        if (!sha.findMany.repoId || !sha.findMany.branchId) {
          toast.error("Missing repoId or branchId");
          return;
        }
        sha.findMany.loading = true;
        const { data, status } = await V2ApiFetch.v2.api.git.sha[
          "find-many"
        ].get({
          query: {
            repoId: sha.findMany.repoId,
            branchId: sha.findMany.branchId,
          },
        });
        if (status === 200) {
          sha.findMany.data = (data?.data as any) || [];
        }
      } catch (error) {
        console.log(error);
      } finally {
        sha.findMany.loading = false;
      }
    },
  },
});

const V2GitState = proxy({
  repo,
  branch,
  sha,
});

export default V2GitState;
