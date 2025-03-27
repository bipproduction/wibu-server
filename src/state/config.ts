/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import { proxy } from "valtio";

const configState = proxy({
  notif: null as string | null,
  selected: null as string | null,
  configList: {
    list: [] as any[],
    async load() {
      const list = await ApiFetch.api.etc["config-list"].get();
      this.list = list.data?.data as any[];
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
  run: {
    loading: false as boolean,
    message: null as string | null,
    async run({ name }: { name: string }) {
      try {
        this.loading = true;
        const { data } = await ApiFetch.api.etc["config-run"]({
          name,
        }).post();

        console.log(data?.status);

        if (data?.status !== 204) {
          this.loading = false;
          this.message = JSON.stringify(
            data?.body as unknown as string,
            null,
            2
          );
          return data;
        }
        this.loading = false;
        this.message = "SUCCESS";
        return data;
      } catch (error) {
        this.loading = false;
        this.message = (error as { message: string }).message;
      }
    },
  },
  detail: {
    name: null as string | null,
    text: null as string | null,
    async load({ name }: { name: string }) {
      this.name = name;
      if (!name) {
        return {
          status: 400,
          body: {
            message: "Name is required",
          },
        };
      }
      const { data } = await ApiFetch.api.etc["config-text"]({
        name,
      }).get();
      this.text = data?.data as string;
    },
  },
  create: {
    name: null as string | null,
    text: null as string | null,
    loading: false as boolean,
    message: null as string | null,
    async create({
      name,
      text,
    }: { name: string; text: string }) {
      try {
        this.loading = true;
        if (!name || !text) {
          return {
            status: 400,
            body: {
              message: "Name and text are required",
            },
          };
        }

        console.log(name, text);
        const { data } = await ApiFetch.api.etc["config-create"].post({
          name,
          text,
        });
        this.loading = false;
        configState.configList.load();
        this.name = null;
        this.text = null;
        this.message = "SUCCESS ";
        return data;
      } catch (error) {
        this.loading = false;
        this.message = (error as { message: string }).message;
      }
    },
  },
});

export default configState;
