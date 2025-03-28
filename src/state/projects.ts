import ApiFetch from "@/lib/api-fetch";
import toast from "react-simple-toasts";
import { proxy } from "valtio";

const projectState = proxy({
  releases: {
    list: null as string[] | null,
    current: null as string | null,
    name: null as string | null,
    namespace: null as string | null,
    loading: false as boolean,
    async load({ name, namespace }: { name: string; namespace: string }) {
      this.name = name;
      this.namespace = namespace;
      const { data } = await ApiFetch.api.projects["releases"]({
        name,
      })({ namespace }).get();
      this.list = data?.project ?? null;
      this.current = data?.current ?? null;
    },
    async assign({ release }: { release: string }) {
      this.loading = true;
      const { data } = await ApiFetch.api.projects["releases-assign"]({
        name: this.name!,
      })({
        namespace: this.namespace!,
      })({
        release,
      }).post();

      toast(data?.success ? "Success" : "Failed");
      this.load({ name: this.name!, namespace: this.namespace! });
      this.loading = false;
     
      return data?.success ?? false;
    },
  },
});

export default projectState;
