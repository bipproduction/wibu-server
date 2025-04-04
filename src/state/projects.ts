import apiFetch from "@/lib/api-fetch";
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
      projectState.releases.name = name;
      projectState.releases.namespace = namespace;
      const { data } = await apiFetch.api.projects["releases"]({
        name,
      })({ namespace }).get();
      projectState.releases.list = data?.project ?? null;
      projectState.releases.current = data?.current ?? null;
    },
    async assign({ release }: { release: string }) {
      projectState.releases.loading = true;
      const { data } = await apiFetch.api.projects["releases-assign"]({
        name: projectState.releases.name!,
      })({
        namespace: projectState.releases.namespace!,
      })({
        release,
      }).post();

      toast(data?.success ? "Success" : "Failed");
      projectState.releases.load({ name: projectState.releases.name!, namespace: projectState.releases.namespace! });
      projectState.releases.loading = false;
     
      return data?.success ?? false;
    },
  },
});

export default projectState;
