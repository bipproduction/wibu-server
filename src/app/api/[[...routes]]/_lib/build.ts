/* eslint-disable @typescript-eslint/no-explicit-any */
const OWNER = "bipproduction";
const REPO = "wibu-server";
const WORKFLOW_ID = "build.yml";
const WIBU_GH_TOKEN = process.env.WIBU_GH_TOKEN;

async function build({ config }: { config: Record<string, any> }) {
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

export default build;
