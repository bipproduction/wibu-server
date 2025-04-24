import getPort from "get-port";

async function findPort(params?: {
  count?: number;
  portStart?: number;
  portEnd?: number;
  exclude?: number[];
  debug?: boolean;
}) {
  const {
    count = 1,
    portStart = 3000,
    portEnd = 6000,
    exclude = [],
    debug = false,
  } = params || {};

  const usedPorts = new Set(exclude);

  if (debug) {
    console.log("[findPort] params:", params);
    console.log("[findPort] usedPorts:", Array.from(usedPorts));
  }

  if (count <= 0) throw new Error("Count harus lebih besar dari 0");
  if (portStart >= portEnd)
    throw new Error("portStart harus lebih kecil dari portEnd");
  if (portStart < 0 || portEnd > 65535)
    throw new Error("Port harus dalam range 0-65535");

  const fullRange = Array.from(
    { length: portEnd - portStart + 1 },
    (_, i) => portStart + i
  ).filter((p) => !usedPorts.has(p));

  if (debug) console.log("[findPort] filtered port range:", fullRange);

  if (count > fullRange.length)
    throw new Error(
      `Count tidak boleh lebih besar dari range port (${fullRange.length})`
    );

  const result: number[] = [];

  for (const port of fullRange) {
    const available = await getPort({ port });

    // pastikan hasil tetap dalam range
    if (
      available >= portStart &&
      available <= portEnd &&
      !usedPorts.has(available) &&
      !result.includes(available)
    ) {
      result.push(available);
      if (result.length === count) break;
    }
  }

  return result.length === count ? result : null;
}

async function processConfigGenerator(params: {
  count?: number;
  name: string;
  namespace: string;
  defaultPorts?: number[] | undefined;
  excludePorts?: number[] | undefined;
  env?: Record<string, string>;
  debug?: boolean;
}) {
  const {
    count = 1,
    name,
    namespace,
    defaultPorts,
    excludePorts = [],
    env = {},
    debug = false,
  } = params;

  const ports =
    defaultPorts ?? (await findPort({ count, exclude: excludePorts, debug }));
  if (!ports) throw new Error("Gagal mencari port");

  const apps = ports.map((port) => ({
    name: `${name}-${port}`,
    namespace,
    script: "server.js",
    interpreter: "~/.bun/bin/bun",
    exec_mode: "fork",
    instances: 1,
    env: {
      PORT: port,
      PATH: "~/.bun/bin:$PATH",
      ...env,
    },
    max_memory_restart: "1G",
    autorestart: true,
    watch: false,
    wait_ready: true,
    restart_delay: 4000,
    merge_logs: true,
    time: true,
    max_size: "10M",
    retain: 5,
    compress: true,
    source_map_support: false,
    cwd: `/var/www/projects/${name}/${namespace}/current`,
  }));

  if (debug) console.log("[processConfigGenerator] apps:", apps);

  return { apps };
}

export default processConfigGenerator;
