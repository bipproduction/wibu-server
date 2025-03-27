'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import { proxy } from "valtio";

const processState = proxy({
  list: [] as any[],
  table: "",
  selected: null as Record<string, any> | null,
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
    return data;
  },
  async reload(params: { namespace: string }) {
    processState.loading = true;
    const { data } = await ApiFetch.api.process.reload(params).post();
    processState.loading = false;
    processState.load();
    return data;
  },
  async stop(params: { namespace: string }) {
    processState.loading = true;
    const { data } = await ApiFetch.api.process.stop(params).post();
    processState.loading = false;
    processState.load();
    return data;
  },
  async remove(params: { namespace: string }) {
    processState.loading = true;
    const { data } = await ApiFetch.api.process.remove(params).post();
    processState.loading = false;
    processState.load();
    return data;
  },
});

export default processState;