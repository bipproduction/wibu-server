#!/usr/bin/env bun
/* eslint-disable @typescript-eslint/no-explicit-any */

const GITHUB_TOKEN = process.env.WIBU_GH_TOKEN;
const REPO_OWNER = "bipproduction";
const REPO_NAME = "wibu-server";

const headers = {
  Authorization: `token ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github+json",
};

async function deleteAllWorkflowRuns(page = 1) {
  try {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs?page=${page}&per_page=100`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.error(
        `Failed to fetch workflow runs. Status: ${response.status}`
      );
      return;
    }

    const data = await response.json();
    const runs = data.workflow_runs || [];

    if (runs.length === 0) {
      console.log("✅ No more workflow runs to delete.");
      return;
    }

    // Filter hanya run yang sudah selesai
    const filteredRuns = runs.filter(
      (run: any) =>
        run.status === "completed" &&
        (run.conclusion === "success" || run.conclusion === "failure")
    );

    console.log(
      `📄 Found ${filteredRuns.length} deletable runs on page ${page}`
    );

    // Hapus secara paralel
    const deletePromises = filteredRuns.map(async (run: any) => {
      const deleteUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/runs/${run.id}`;
      const res = await fetch(deleteUrl, { headers, method: "DELETE" });

      if (res.status === 204) {
        console.log(`✅ Deleted run ID: ${run.id}`);
      } else {
        console.warn(
          `⚠️ Failed to delete run ID: ${run.id} (status: ${res.status})`
        );
      }
    });

    await Promise.all(deletePromises);

    console.log(`➡️ Moving to next page: ${page + 1}`);
    await deleteAllWorkflowRuns(page + 1);
  } catch (error) {
    console.error("💥 Error occurred:", error);
  }
}

deleteAllWorkflowRuns();
