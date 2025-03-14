/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import { proxy } from "valtio";

type ProcessState = {
  list: any[];
  table: string;
  load: () => Promise<void>;
}

const processState = proxy<ProcessState>({
  list: [],
  table: "",
  async load() {
    const { data } = await ApiFetch.api.process.list.get();
    const ls = data?.data as any[];
    if (ls) {
      processState.list = ls;
    }

    const dataTable = await ApiFetch.api.process.table.get();
    processState.table = dataTable.data?.data as string;
  },
});

export default processState;