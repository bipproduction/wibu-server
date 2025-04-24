import net from "net";

async function findPort(params?: {
  count?: number;
  portStart?: number;
  portEnd?: number;
  exclude?: number[];
}) {
  const {
    count = 1,
    portStart = 3000,
    portEnd = 6000,
    exclude = [],
  } = params || {};

  const listPort = [...exclude].flat();
  const usedPorts = Array.from(new Set(listPort)) as number[];

  // Validasi input
  if (count <= 0) {
    throw new Error("Count harus lebih besar dari 0");
  }
  if (count > portEnd - portStart + 1) {
    console.error(
      `Count tidak boleh lebih besar dari range port (${
        portEnd - portStart + 1
      })`
    );
    process.exit(1);
  }
  if (portStart >= portEnd) {
    console.error("portStart harus lebih kecil dari portEnd");
    process.exit(1);
  }
  if (portStart < 0 || portEnd > 65535) {
    console.error("Port harus berada dalam rentang 0-65535");
    process.exit(1);
  }

  // Fungsi untuk memeriksa apakah port tersedia
  const checkPort = (port: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const server = net.createServer();

      server.once("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE") {
          resolve(false);
        } else {
          resolve(true); // Anggap tersedia jika error bukan karena port digunakan
        }
        server.close();
      });

      server.once("listening", () => {
        resolve(true);
        server.close();
      });

      server.listen(port, "0.0.0.0");
    });
  };

  // Optimasi pencarian port
  const availablePorts = new Set<number>();
  const usedPortsSet = new Set(usedPorts);

  for (let port = portStart; port <= portEnd; port++) {
    if (availablePorts.size >= count) break;

    // Skip jika port ada di exclude list
    if (usedPortsSet.has(port)) continue;

    try {
      const isAvailable = await checkPort(port);
      if (isAvailable) {
        availablePorts.add(port);
      }
    } catch (error) {
      console.warn(`Gagal memeriksa port ${port}:`, error);
      continue;
    }
  }

  const result =
    availablePorts.size === count ? Array.from(availablePorts) : null;
  return result;
}

async function v2ConfigGenerator(params: {
  count?: number;
  name: string;
  namespace: string;
  defaultPorts?: number[] | null;
  excludePorts?: number[] | null;
  env: Record<string, string>;
}) {
  const { count = 1, name, namespace, defaultPorts, excludePorts, env } = params;

  const port =
    defaultPorts ?? (await findPort({ count, exclude: excludePorts ?? [] }));

  const configGenerator = port?.map((v) => ({
    name: name + "-" + v,
    namespace: namespace,
    script: "bun",
    args: `--bun run start`,
    exec_mode: "fork",
    instances: 1,
    env: {
      ...env,
      NODE_ENV: "production",
      PORT: v,
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

  return {
    apps: configGenerator,
  };
}

export default v2ConfigGenerator;
