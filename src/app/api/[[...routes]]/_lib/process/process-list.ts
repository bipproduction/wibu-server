/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { exec } from "child_process";
import _ from "lodash";
import { promisify } from "util";
import dayjs from "dayjs";

const X = promisify(exec);

async function processList() {
  const { stdout } = await X("pm2 jlist 2>&1");
  const data = stdout.toString();
  try {
    const parsedData: any[] = JSON.parse(data);
    const newData = parsedData.map((d) => {
      return {
        status: d.pm2_env.status || "null",
        name: d.name,
        namespace: d.pm2_env.namespace || "null",
        branch: d.pm2_env?.versioning?.branch || "null",
        cwd: d.pm2_env.cwd || "null",
        memory: d.monit.memory || "null",
        // url: d.pm2_env?.versioning?.url || "null",
        // repo_path: d.pm2_env?.versioning?.repo_path || "null",
        // cpu: d.monit.cpu || "null",
        // kill_retry_time: d.pm2_env.kill_retry_time || "null",
        args: d.pm2_env.args || "null",
        pm_uptime: dayjs().diff(dayjs(d.pm2_env.pm_uptime), "hours")+" h"
      };
    });

    const processGroup = _.sortBy(newData, "status");
    return {
      data: processGroup,
    };
  } catch (error) {
    return {
      data: [],
    };
  }
}

export default processList;
