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
        status: d.pm2_env.status,
        name: d.name,
        namespace: d.pm2_env.namespace,
        branch: d.pm2_env?.versioning?.branch,
        cwd: d.pm2_env.cwd,
        memory: d.monit.memory,
        url: d.pm2_env?.versioning?.url,
        repo_path: d.pm2_env?.versioning?.repo_path,
        cpu: d.monit.cpu,
        kill_retry_time: d.pm2_env.kill_retry_time,
        args: d.pm2_env.args,
        pm_uptime: dayjs().diff(dayjs(d.pm2_env.pm_uptime), "hours")+" h",
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
