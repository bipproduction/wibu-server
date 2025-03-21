import dedent from "dedent";
import { nanoid } from "nanoid";

const OWNER = "bipproduction";
const REPO = "wibu-server";
const WORKFLOW_ID = "test.yml";
const WIBU_GH_TOKEN = process.env.WIBU_GH_TOKEN;

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
};

type Config2 = Config & {
  date: string;
  appVersion: string;
};

async function build(config: Config) {
  const config2: Config2 = {
    ...config,
    date: new Date().toISOString(),
    appVersion: nanoid(),
  };
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
          data: JSON.stringify(config2),
        },
      }),
    }
  );

  return res;
}
build({
  name: "hipmi",
  branch: "staging",
  namespace: "hipmi-staging",
  repo: "hipmi",
  count: 1,
  env: dedent`
    DATABASE_URL="postgresql://bip:Production_123@localhost:5433/hipmi-stg-v1?schema=public"
    WIBU_PWD="QWERTYUIOPLKJHGFDSAZXCVBNMQAZWSXEDCRFVTGBYHNUJMIKOLPPOIUYTREWQLKJHGFDSAMNBVCXZlghvftyguhijknhbgvcfytguu8okjnhbgvfty7u8oilkjnhgvtygu7u8ojilnkhbgvhujnkhghvjhukjnhb"
    Client_KEY="SB-Mid-client-9NDTxltqdZrEB9m-"
    Server_KEY="SB-Mid-server-NyltU-U7fLVQd1nv1LWBKylr"
    MAPBOX_TOKEN="pk.eyJ1IjoibWFsaWtrdXJvc2FraSIsImEiOiJjbHppZHh2enYwZnQ3MmlyMWc2Y2RlMzZoIn0.XssvJvq_iniclf8UhvXaIg"
    WS_APIKEY="eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiY20wdXIxeXh3MDAwMDU2bnNqbHI2MTg3cCIsIm5hbWUiOiJiYWdhcyIsImVtYWlsIjoiYmFnYXNAZ21haWwuY29tIiwiQXBpS2V5IjpbeyJpZCI6ImNtMHVyMXl5MzAwMDI1Nm5zazNia2xyc28iLCJuYW1lIjoiZGVmYXVsdCJ9XX0sImlhdCI6MTcyNTk1NjMyMSwiZXhwIjo0ODgxNzE2MzIxfQ.9D3YszZA_ljrkTKMcgo03u7PL5mo9OaoM41rbUrOsz8"
    NEXT_PUBLIC_WIBU_REALTIME_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5aml4c2J1c2diYnR2am9namhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY3Mzk1NDUsImV4cCI6MjA0MjMxNTU0NX0.jHNW5Pwhj-KXUQOMqzILaAz62k3xlKEL5XKE4xoR7Xc"
    NEXT_PUBLIC_BASE_TOKEN_KEY="QWERTYUIOPLKJHGFDSAZXCVBNMQAZWSXEDCRFVTGBYHNUJMIKOLPPOIUYTREWQLKJHGFDSAMNBVCXZlghvftyguhijknhbgvcfytguu8okjnhbgvfty7u8oilkjnhgvtygu7u8ojilnkhbgvhujnkhghvjhukjnhb"
    NEXT_PUBLIC_BASE_SESSION_KEY="hipmi-key"
    `,
}).then(async (res) => {
  if (!res.ok) {
    console.log(res.status);
    console.log(await res.text());
    console.error("Failed to trigger build");
    return;
  }
  console.log("Build triggered successfully");
});
