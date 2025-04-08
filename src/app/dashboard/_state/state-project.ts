/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ApiV2Fetch from "@/lib/apiv2-fetch";
import { toast } from "react-toastify";
import { proxy } from "valtio";

const stateProject = proxy({
  list: {
    data: null as any[] | null,
    async load() {
      const { data } = await ApiV2Fetch.apiv2.project.list.get({ query: {} });
      this.data = data?.data || [];
    },
    async search(q: string) {},
  },
  create: {
    form: {
      name: "" as string,
      full_name: "" as string,
      branch: "main" as string,
      push: false,
      seed: false,
      build: true,
      environment: [] as { key: string; value: string }[],
    },
    async submit() {
      if (!stateProject.create.form.name || !stateProject.create.form.full_name)
        return toast.error("Project name and full name are required");

      const { data } = await ApiV2Fetch.apiv2.project.create.post(
        stateProject.create.form
      );
      if (!data || !data.success) return toast.error(data?.message);
      toast.success(data.message);
    },
  },
});

export default stateProject;
