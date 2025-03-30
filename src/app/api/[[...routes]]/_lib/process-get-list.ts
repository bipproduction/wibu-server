/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { exec } from "child_process";
import _ from "lodash";
import { promisify } from "util";
import dayjs from "dayjs";

const X = promisify(exec);

async function processGetList() {
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
        memory: (d.monit.memory / 1024 / 1024).toFixed(2) + " MB" || "null",
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

export default processGetList;
