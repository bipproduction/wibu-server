/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFetch from "@/lib/api-fetch";
import { proxy } from "valtio";

const utilState = proxy({
  origin: {
    data: null as string | null,
    async load() {
      const res = await fetch("/api/util/origin", { cache: "no-cache" });
      if (!res.ok) return;
      const data = await res.json();
      utilState.origin.data = data.origin;
    },
  },
  anime: {
    list: null as any[] | null,
    async load() {
      const { data } = await ApiFetch.api.util["anime-list"].get();
      utilState.anime.list = data || [];
    },
  },
});

export default utilState;
