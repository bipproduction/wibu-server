/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import { proxy } from "valtio";
import projectState from "./projects";
import toast from "react-simple-toasts";

const configTemplate = `
name: "name"
namespace: "namespace"
branch: "branch"
repo: "repo"
env: |
  NODE_ENV="production"
options:
  dbPush: false
  dbSeed: false
  build: true
  # newConfig: true
  # count: 1
  # ports: null
`;

const configState = proxy({
  notif: null as string | null,
  selected: null as string | null,
  isEdit: false as boolean,
  configList: {
    list: [] as any[],
    async load() {
      const list = await ApiFetch.api.config["config-list"].get();
      configState.configList.list = list.data as any[];
    },
  },
  configUpload: {
    async upload({ file, name }: { file: File; name: string }) {
      const { data } = await ApiFetch.api.config["config-upload"].post({
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
      if (!configState.configDelete.name) {
        return {
          status: 400,
          body: {
            message: "Name is required",
          },
        };
      }
      const { data } = await ApiFetch.api.config["config-delete"]({
        name: configState.configDelete.name!,
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
        configState.run.loading = true;
        const { data } = await ApiFetch.api.config["config-run"]({
          name,
        }).post();

        if (data?.status !== 204) {
          configState.run.loading = false;
          configState.run.message = JSON.stringify(
            data?.body as unknown as string,
            null,
            2
          );
          return data;
        }
        configState.run.loading = false;
        configState.run.message = "SUCCESS";
        return data;
      } catch (error) {
        configState.run.loading = false;
        configState.run.message = (error as { message: string }).message;
      } finally {
        configState.run.loading = false;
      }
    },
  },
  detail: {
    name: null as string | null,
    text: null as string | null,
    json: null as Record<string, any> | null,
    async load({ name }: { name: string }) {
      if (!name) {
        return {
          status: 400,
          body: {
            message: "Name is required",
          },
        };
      }
      const { data } = await ApiFetch.api.config["config-text"]({
        name,
      }).get();
      const { data: json } = await ApiFetch.api.config["config-json"]({
        name,
      }).get();

      configState.detail.name = name;
      configState.detail.text = data?.data as string;
      configState.detail.json = json?.data as Record<string, unknown>;

      // console.log(json?.data);
      projectState.releases.load({
        name: json?.data.name as string,
        namespace: json?.data.namespace as string,
      });
    },
  },
  create: {
    name: null as string | null,
    text: configTemplate as string | null,
    loading: false as boolean,
    message: null as string | null,
    async create({ name, text }: { name: string; text: string }) {
      try {
        configState.create.loading = true;
        if (!name || !text) {
          return toast("Name and text are required");
        }

        // console.log(name, text);
        const { data } = await ApiFetch.api.config["config-create"].post({
          name,
          text,
        });
        configState.create.loading = false;
        configState.configList.load();
        configState.create.name = null;
        configState.create.text = null;
        configState.create.message = "SUCCESS ";
        return data;
      } catch (error) {
        configState.create.loading = false;
        configState.create.message = (error as { message: string }).message;
      } finally {
        configState.create.loading = false;
      }
    },
  },
});

export default configState;
