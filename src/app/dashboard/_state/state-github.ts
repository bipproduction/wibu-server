/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiV2Fetch from "@/lib/apiv2-fetch";
import { Prisma } from "@prisma/client";
import { toast } from "react-toastify";
import { proxy } from "valtio";

const stateGithub = proxy({
  repos: {
    selected: null as Record<string, any> | null,
    list: {
      data: null as Prisma.ReposGetPayload<{ omit: { updatedAt: true } }>[] | null,
      async load() {
        const { data } = await ApiV2Fetch.apiv2.github.repos.get({
          query: {
            page: 1,
            per_page: 10,
          },
        });
        console.log(data);
        stateGithub.repos.list.data = data?.data ?? [];
      },
      async search(q: string) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const { data } = await ApiV2Fetch.apiv2.github["repos-search"].get({
          query: {
            q,
            page: 1,
            per_page: 10,
          },
        });
        stateGithub.repos.list.data = data?.data ?? [];
      },
      async syncData() {
        const data = await ApiV2Fetch.apiv2.github["repos-sync"].get();
        toast.success("Repo Synced");
        return data;
      },
    },
    async get({ projectId }: { projectId: string }) {
      const { data } = await ApiV2Fetch.apiv2.github["repo-get"].get({
        query: {
          projectId,
        },
      });
      return data?.data;
    },
  },
  branch: {
    list: {
      loading: false,
      loadingSync: false,
      data: null as
        | Prisma.BranchesGetPayload<{ omit: { updatedAt: true } }>[]
        | null,
      async load({ projectId }: { projectId: string }) {
        stateGithub.branch.list.loading = true;
        const { data } = await ApiV2Fetch.apiv2.github["branch-list"].get({
          query: {
            projectId,
            page: 1,
            per_page: 10,
          },
        });
        stateGithub.branch.list.loading = false;
        stateGithub.branch.list.data = data?.data ?? [];
      },
      async syncData({ projectId }: { projectId: string }) {
        stateGithub.branch.list.loadingSync = true;
        const { data } = await ApiV2Fetch.apiv2.github["branch-sync"].get({
          query: {
            projectId,
          },
        });
        stateGithub.branch.list.loadingSync = false;
        toast.success("Branch Synced");

        return data;
      },
      async search({ projectId, q }: { projectId: string; q: string }) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const { data } = await ApiV2Fetch.apiv2.github["branch-search"].get({
          query: {
            projectId,
            q,
            page: 1,
            per_page: 10,
          },
        });

        stateGithub.branch.list.data = data?.data ?? [];
      },
    },
  },
});
export default stateGithub;
