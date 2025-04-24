import { Prisma } from "@prisma/client";
import { proxy } from "valtio";
import V2ApiFetch from "../_lib/v2-api-fetch";
import { V2ProjectCreateBody } from "../api/_lib/project";

const findMany = proxy({
  loading: false,
  data: null as
    | Prisma.ProjectsGetPayload<{ omit: { isActive: true } }>[]
    | null,
  load: async () => {
    const { data, status } = await V2ApiFetch.v2.api.project["find-many"].get();
    if (status === 200) {
      findMany.data = data?.data || [];
    }
  },
});

const form: V2ProjectCreateBody = {
  name: "",
  full_name: "",
  build: true,
  push: true,
  seed: true,
  projectEnvironment: {
    name: "production",
    branch: "main",
  },
  env: {},
  instance: 1,
  reposId: "",
};

const create = proxy({
  loading: false,
  form: form,
  submit: async () => {
    const { error } = await V2ApiFetch.v2.api.project.create.post(
      create.form
    );
    console.log(JSON.stringify(error, null, 2));
    // const errorMessages = _.entries(
    //   _.omit(error?.value, ["expected", "found", "errors"])
    // )
    //   .map(([k, v]) => `${k}: ${v}`)
    //   .join("\n");
    // if (error) {
    //   console.log(error);
    //   toast.error(errorMessages);
    //   return;
    // }
    // if (status === 200) {
    //   create.form = form;
    //   findMany.load();
    //   toast.success("Project created successfully");
    // } else {
    //   toast.error("Failed to create project");
    // }
  },
});

const v2ProjectState = proxy({
  findMany,
  create,
});

export default v2ProjectState;
