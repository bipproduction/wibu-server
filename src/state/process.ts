"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import toast from "react-simple-toasts";
import { proxy } from "valtio";

const processState = proxy({
  list: [] as any[],
  table: "",
  // selected: null as Record<string, any> | null,
  loading: false,
  async load() {
    processState.loading = true;
    const { data } = await ApiFetch.api.process.list.get();
    const ls = data?.data as any[];
    if (ls) {
      processState.list = ls;
    }
    processState.loading = false;
  },
  async restart(params: { namespace: string }) {
    processState.loading = true;
    const { data } = await ApiFetch.api.process.restart(params).post();
    processState.loading = false;
    processState.load();
    toast(`Restarted ${params.namespace}`);
    return data;
  },
  async reload(params: { namespace: string }) {
    processState.loading = true;
    const { data } = await ApiFetch.api.process.reload(params).post();
    processState.loading = false;
    processState.load();
    toast(`Reloaded ${params.namespace}`);
    return data;
  },
  async stop(params: { namespace: string }) {
    processState.loading = true;
    const { data } = await ApiFetch.api.process.stop(params).post();
    processState.loading = false;
    processState.load();
    toast(`Stopped ${params.namespace}`);
    return data;
  },
  async remove(params: { namespace: string }) {
    processState.loading = true;
    const { data } = await ApiFetch.api.process.remove(params).post();
    processState.loading = false;
    processState.load();
    toast(`Removed ${params.namespace}`);
    return data;
  },
  log: {
    loading: false,
    text: "[LOG]: ...",
    async log(params: { name: string }) {
      this.text = "[LOG]: loading ...";
      this.loading = true;
      const { data } = await ApiFetch.api.process.log(params).get();
      this.text = data as string;
      this.loading = false;
      return data;
    },
  },
  processItem: {
    data: null as Record<string, any> | null,
    loading: false,
    async item(params: { name: string }) {
      this.loading = true;
      const { data } = await ApiFetch.api.process.item(params).get();
      this.data = data as Record<string, any> | null;
      this.loading = false;
      return data;
    },
  },
});

export default processState;
