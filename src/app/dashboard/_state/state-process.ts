/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiV2Fetch from "@/lib/apiv2-fetch";
import { proxy } from "valtio";
import { PROCESS } from "@/types/process";
import { toast } from "react-toastify";

const stateProcess = proxy({
  list: {
    loading: false,
    data: {
      online: null as PROCESS[] | null,
      offline: null as PROCESS[] | null,
    },
    async load() {
      stateProcess.list.loading = true;
      const { data } = await ApiV2Fetch.apiv2.process.list.get();
      stateProcess.list.data = data?.data as {
        online: PROCESS[];
        offline: PROCESS[];
      };
      stateProcess.list.loading = false;
    },
    async sync() {
      await ApiV2Fetch.apiv2.process.sync.post();
      stateProcess.list.load();
      toast.success("Sync process success");
    },
  },
  findUniq: {
    data: null as any | null,
    async load({ name }: { name: string }) {
      stateProcess.findUniq.data = null;
      const { data } = await ApiV2Fetch.apiv2.process["find-uniq"].get({
        query: { name },
      });
      stateProcess.findUniq.data = data?.data as any;
    },
  },
});

export default stateProcess;
