"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import toast from "react-simple-toasts";
import { proxy } from "valtio";

const processState = proxy({
  list: [] as any[],
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
    lines: {
      line: 15,
      set(line: number) {
        processState.log.lines.line = line;
        window?.localStorage?.setItem("logLines", line.toString());
        processState.log.lines.get();
      },
      get() {
        return Number(window?.localStorage?.getItem("logLines") ?? 15);
      },
    },
    async log(params: { name: string }) {
      processState.log.text = "[LOG]: loading ...";
      processState.log.loading = true;
      processState.log.lines.set(Number(window?.localStorage?.getItem("logLines") ?? 15));
      const { data } = await ApiFetch.api.process
        .log({ name: params.name })({ lines: processState.log.lines.get() })
        .get();
      processState.log.text = data as string;
      processState.log.loading = false;
      return data;
    },
  },
  processItem: {
    data: null as Record<string, any> | null,
    loading: false,
    async item(params: { name: string }) {
      processState.processItem.loading = true;
      const { data } = await ApiFetch.api.process.item(params).get();
      processState.processItem.data = data as Record<string, any> | null;
      processState.processItem.loading = false;
      return data;
    },
  },
});

export default processState;
