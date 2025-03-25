/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import { proxy } from "valtio";

const configState = proxy({
  notif: null as string | null,
  configList: {
    list: [] as any[],
    table: "",
    async load() {
      const list = await ApiFetch.api.etc["config-list"].get();
      this.list = list.data?.data as any[];
      const dataTable = await ApiFetch.api.etc["config-table"].get();
      this.table = dataTable.data?.data as string;
    },
  },
  configUpload: {
    async upload({ file, name }: { file: File; name: string }) {
      const { data } = await ApiFetch.api.etc["config-upload"].post({
        file,
        name,
      });
      configState.configList.load();
      return data;
    },
  },
  configDelete: {
    name: null as string | null,
    async delete() {
      if (!this.name) {
        return {
          status: 400,
          body: {
            message: "Name is required",
          },
        };
      }
      const { data } = await ApiFetch.api.etc["config-delete"]({
        name: this.name,
      }).delete();
      configState.configList.load();
      return data;
    },
  },
});

export default configState;
