import { Octokit } from "octokit";
const WIBU_GH_TOKEN = process.env.WIBU_GH_TOKEN;
const REPO_OWNER = "bipproduction";
const REPO_NAME = "obake";

// Validasi token
if (!WIBU_GH_TOKEN) {
  throw new Error("WIBU_GH_TOKEN is not defined in environment variables");
}

const octokit = new Octokit({
  auth: WIBU_GH_TOKEN,
});

const options = {
  owner: REPO_OWNER,
  repo: REPO_NAME,
  headers: {
    "X-GitHub-Api-Version": "2022-11-28",
  },
}

export {
  octokit,
  options,
};

