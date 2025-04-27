/* eslint-disable @typescript-eslint/no-unused-vars */
const config = {
  name: "hipmi-3001",
  namespace: "hipmi-production",
  script: "bun",
  args: "--bun run start",
  exec_mode: "fork",
  instances: 1,
  env: {
    PORT: 3001,
    NODE_ENV: "production",
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
  cwd: "/var/www/projects/hipmi/hipmi-production/current",
};

export type CONFIG = typeof config;
