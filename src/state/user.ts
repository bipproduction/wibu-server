/* eslint-disable @typescript-eslint/no-explicit-any */
import { proxy } from "valtio";
import { SESSION } from "../../types/session";
import apiFetch from "@/lib/api-fetch";

const userState = proxy({
  session: {
    data: null as SESSION | null,
    async load() {
      const { data } = await apiFetch.api.user.session.get();
      if (data) {
        userState.session.data = data as any;
      }
    },
  },
});

export default userState
