import fs from "fs/promises";
import yml from "yaml";
import { exec } from "child_process";
import { promisify } from "util";
const EX = promisify(exec);

const OWNER = "bipproduction";
const REPO = "wibu-server";
const WORKFLOW_ID = "build.yml";
const WIBU_GH_TOKEN = process.env.WIBU_GH_TOKEN;
const UPLOAD_DIR = process.env.WIBU_UPLOAD_DIR;
const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL;

if (!WIBU_GH_TOKEN) {
  throw new Error("WIBU_GH_TOKEN is not defined");
}

type Config = {
  name: string;
  namespace: string;
  branch: string;
  repo: string;
  env: string;
  options?: {
    dbPush?: boolean | undefined;
    dbSeed?: boolean | undefined;
    build?: boolean | undefined;
    newConfig?: boolean | undefined;
    count?: number | undefined;
    ports?: string | null;
  };
};

async function configRun({ params }: { params: { name: string } }) {
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

  try {
    await EX(
      `curl -X PUT -d 'true' ${FIREBASE_DB_URL}/logs/build/${configJson.namespace}/isRunning.json`
    );
    await EX(
      `curl -X PUT -d '{"-0A": "[${new Date().toISOString()}] : start deploy ..."}' ${FIREBASE_DB_URL}/logs/build/${
        configJson.namespace
      }/log.json`
    );
  } catch (error) {
    console.error(error);
  }

  return await run(configJson);
}

async function run(config: Config) {
  config.options = config.options ?? {};
  config.options.dbPush = config.options.dbPush ?? true;
  config.options.dbSeed = config.options.dbSeed ?? true;
  config.options.build = config.options.build ?? true;
  config.options.newConfig = config.options.newConfig ?? false;
  config.options.count = config.options.count ?? 1;
  config.options.ports = config.options.ports ?? null;
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

  console.log(JSON.stringify(config, null, 2));
  return {
    status: res.status,
    body: await res.json(),
  };
}

export default configRun;
