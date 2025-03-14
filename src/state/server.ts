/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import { proxy } from "valtio";

type ServerState = {
  muku: {
    json: any[];
    table: string;
    load: () => Promise<void>;
  };
  wibudev: {
    json: any[];
    table: string;
    load: () => Promise<void>;
  };
};

const serverState = proxy<ServerState>({
  muku: {
    json: [],
    table: "",
    async load() {
      const { data } = await ApiFetch.api.server.config.get();
      const ls = data?.data.muku.subdomains as any[];
      if (ls) {
        serverState.muku.json = ls;
      }
      const dataTabele = await ApiFetch.api.server["table-muku"].get();
      serverState.muku.table = dataTabele.data?.data as string;
    },
  },
  wibudev: {
    json: [],
    table: "",
    async load() {
      const { data } = await ApiFetch.api.server.config.get();
      const ls = data?.data.wibuDev.subdomains as any[];
      if (ls) {
        serverState.wibudev.json = ls;
      }

      const dataTabele = await ApiFetch.api.server["table-wibudev"].get();
      serverState.wibudev.table = dataTabele.data?.data as string;
    },
  },
});

export default serverState;
