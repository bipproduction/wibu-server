import fs from "fs/promises";
import yml from "yaml";

const OWNER = "bipproduction";
const REPO = "wibu-server";
const WORKFLOW_ID = "screenshot.yml";
const WIBU_GH_TOKEN = process.env.WIBU_GH_TOKEN;
const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;

if (!WIBU_GH_TOKEN) {
  throw new Error("WIBU_GH_TOKEN is not defined");
}

type Config = {
  name: string;
  namespace: string;
  branch: string;
  repo: string;
  env: string;
  count: number;
  options?: {
    dbPush?: boolean | undefined;
    dbSeed?: boolean | undefined;
    build?: boolean | undefined;
  };
};

async function configRun(params: { name: string }) {
  const { name } = params;
  if (!name) {
    return {
      status: 400,
      body: {
        message: "Name is required",
      },
    };
  }
  if (!UPLOAD_DIR) {
    return {
      status: 500,
      body: {
        message: "WIBU_UPLOAD_DIR is not defined",
      },
    };
  }
  const config = await fs.readFile(`${UPLOAD_DIR}/config/${name}.yml`, "utf-8");
  const configJson = yml.parse(config);
  return await run(configJson);
}

async function run(config: Config) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_ID}/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `token ${WIBU_GH_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      body: JSON.stringify({
        ref: "main",
        inputs: {
          data: JSON.stringify(config),
        },
      }),
    }
  );

  return res;
}

export default configRun;
