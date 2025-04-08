/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiV2Fetch from "@/lib/apiv2-fetch";
import toast from "react-simple-toasts";
import { proxy } from "valtio";

const stateGithub = proxy({
  repos: {
    selected: null as Record<string, any> | null,
    list: {
      data: null as any[] | null,
      async load() {
        const { data } = await ApiV2Fetch.apiv2.github
          .repos({ page: 1 })({ per_page: 10 })
          .get();
        stateGithub.repos.list.data = data?.data ?? [];
      },
      async search(q: string) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        const { data } = await ApiV2Fetch.apiv2.github["repos-search"]({ q })({
          page: 1,
        })({ per_page: 10 }).get();
        stateGithub.repos.list.data = data?.data ?? [];
      },
      async syncData() {
        const data = await ApiV2Fetch.apiv2.github["repos-sync"].get();
        toast("SUCCESS");
        return data;
      },
    },
  },
});
export default stateGithub;
