import { proxy } from "valtio";

const utilState = proxy({
  origin: {
    data: null as string | null,
    async load(){
        const res = await fetch('/api/util/origin', { cache: 'no-cache' });
        if (!res.ok) return;
        const data = await res.json();
        utilState.origin.data = data.origin;
    }
  }
});

export default utilState;
