/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import toast from "react-simple-toasts";
import { proxy } from "valtio";

const serverState = proxy({
  muku: null as any[] | null,
  wibudev: null as any | null,
  deleteCount: 0,
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
  async load() {
    const { data } = await ApiFetch.api.server["server-config"].get();
    const lsMuku = data?.data.muku as any[];
    if (lsMuku) {
      this.muku = lsMuku;
    }
    const lsWibuDev = data?.data.wibuDev as any[];
    if (lsWibuDev) {
      this.wibudev = lsWibuDev;
    }
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
    this.load();
    toast(`${params.name} Updated!`);
    this.event = null;
  },
  async onRemove({ domainId, id }: { domainId: string; id: string }) {
    this.deleteCount++;
    toast(`${this.deleteCount} / 5 to delete`);
    if (this.deleteCount === 3) {
      await ApiFetch.api.server["server-remove"].post({
        name: domainId,
        data: { id },
      });

      this.event = null;
      this.deleteCount = 0;
      toast(`${id} Deleted!`);
      this.load();
      return;
    }
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
    this.load();
    toast(`${params.name} Added! ${res.data?.message}`);
    this.event = null;
    this.form = undefined;
  },
});

export default serverState;
