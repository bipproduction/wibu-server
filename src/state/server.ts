/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import toast from "react-simple-toasts";
import { proxy } from "valtio";

const serverState = proxy({
  muku: null as any[] | null,
  wibudev: null as any | null,
  form: {
    id: "",
    domainId: "",
    name: "",
    ports: [3000],
  } as
    | { id: string; domainId: string; name: string; ports: number[] }
    | undefined,
  updateData: null as {
    id?: string | undefined;
    domainId?: string | undefined;
    name?: string | undefined;
    ports?: number[] | undefined;
  } | null,
  load: {
    loading: false as boolean,
    async load() {
      try {
        serverState.load.loading = true;
        const { data } = await ApiFetch.api.server["server-config"].get();
        const lsMuku = data?.data.muku as any[];
        if (lsMuku) {
          serverState.muku = lsMuku;
        }
        const lsWibuDev = data?.data.wibuDev as any[];
        if (lsWibuDev) {
          serverState.wibudev = lsWibuDev;
        }
      } catch (error) {
        toast(`[LOAD SERVER]: ${error}`);
      } finally {
        serverState.load.loading = false;
      }
    },
  },
  event: null as null | {
    name: string;
    action: "add" | "remove" | "update";
  },
  async onUpdate(params: {
    domainId: string;
    id: string;
    name: string;
    ports: number[];
  }) {
    await ApiFetch.api.server["server-edit"].post({
      name: params.domainId,
      data: params,
    });

    serverState.load.load();
    toast(`${params.name} Updated!`);
  },
  async onRemove({ domainId, id }: { domainId: string; id: string }) {
    await ApiFetch.api.server["server-remove"].post({
      name: domainId,
      data: { id },
    });

    serverState.event = null;
    toast(`${id} Deleted!`);
    serverState.load.load();
    return;
  },
  async onCreate(params: {
    domainId: string;
    id: string;
    name: string;
    ports: number[];
  }) {
    // console.log(params.ports);
    const res = await ApiFetch.api.server["server-add"].post({
      name: params.domainId,
      data: params,
    });
    serverState.load.load();
    toast(`${params.name} Added! ${res.data?.message}`);
    serverState.event = null;
    serverState.form = undefined;
  },
  async reload() {
    await ApiFetch.api.server["server-reload"].post();
    serverState.load.load();
    toast("[SUCCESS] Server Reloaded!");
  },
});

export default serverState;
