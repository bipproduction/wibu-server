/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiV2Fetch from "@/lib/apiv2-fetch";
import { Prisma } from "@prisma/client";
import { toast } from "react-toastify";
import { proxy } from "valtio";

const stateDomain = proxy({
  config: {
    muku: null as Prisma.DomainCreateInput | null,
    wibuDev: null as Prisma.DomainCreateInput | null,
    loading: false,
    async load() {
      stateDomain.config.loading = true;
      try {
        const { data } = await ApiV2Fetch.apiv2.domain.config.get();

        stateDomain.config.wibuDev = data?.wibuDev ?? ({} as any);
        stateDomain.config.muku = data?.muku ?? ({} as any);
      } catch (error) {
        console.error(error);
      } finally {
        stateDomain.config.loading = false;
      }
    },
    async syncConfig() {
      await ApiV2Fetch.apiv2.domain["sync-config"].post();
      stateDomain.config.load();
      toast.success("Sync domain success");
    },
  },
});

export default stateDomain;
