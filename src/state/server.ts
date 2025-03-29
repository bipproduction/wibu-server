/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import toast from "react-simple-toasts";
import { proxy } from "valtio";

const serverState = proxy({
  muku: null as any[] | null,
  wibudev: null as any | null,
  deleteCount: 0,
  updateData: null as {
    id?: string | undefined;
    domainId?: string | undefined;
    name?: string | undefined;
    ports?: number[] | undefined;
  } | null,
  async load() {
    const { data } = await ApiFetch.api.server.config.get();
    const lsMuku = data?.data.muku.subdomains as any[];
    if (lsMuku) {
      this.muku = lsMuku;
    }
    const lsWibuDev = data?.data.wibuDev.subdomains as any[];
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
    if (params.domainId === "muku") {
      const newData = this.muku?.map((item: any) => {
        if (item.id === params.id) {
          return params;
        }
        return item;
      });
      this.muku = newData as any[];
      this.updateData = null;
      this.event = null;
    }

    if (params.domainId === "wibuDev") {
      const newData = this.wibudev?.map((item: any) => {
        if (item.id === params.id) {
          return params;
        }
        return item;
      });
      this.wibudev = newData as any[];
    }
  },
  async onRemove({ domainId, id }: { domainId: string; id: string }) {
    this.deleteCount++;
    toast(`${this.deleteCount} / 5 to delete`);
    if (this.deleteCount === 5) {
      if (domainId === "muku") {
        const newData = this.muku?.filter((item: any) => item.id !== id);
        this.muku = newData as any[];
      }

      if (domainId === "wibuDev") {
        const newData = this.wibudev?.filter((item: any) => item.id !== id);
        this.wibudev = newData as any[];
      }

      this.event = null;
      this.deleteCount = 0;
      toast(`${id} Deleted!`);
      return;
    }

    setTimeout(() => {
      this.deleteCount = 0;
    }, 5000);
  },
});

export default serverState;
