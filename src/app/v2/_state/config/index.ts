/* eslint-disable @typescript-eslint/no-explicit-any */
import { proxy } from "valtio";
import V2ApiFetch from "../../_lib/v2-api-fetch";
import { CONFIG } from "../../_types/CONFIG";

const configState = proxy({
  findUnique: {
    loading: false,
    data: null as CONFIG[] | null,
    load: async ({ projectEnvironmentId }: { projectEnvironmentId: string }) => {
      try {
        configState.findUnique.loading = true;
        const { data, status } = await V2ApiFetch.v2.api.config.findUnique.get({
          query: {
            projectEnvironmentId,
          },
        });
        if (status === 200) {
          const dataJson = ((data?.data?.json as any).apps as any[])
          configState.findUnique.data = dataJson || [];
        }
      } catch (error) {
        console.log(error);
      } finally {
        configState.findUnique.loading = false;
      }
    },
  },
});

export default configState;