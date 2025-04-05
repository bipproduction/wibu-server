import { octokit, options } from "../okto";

// Fungsi untuk mendapatkan semua workflow runs dari build.yml dengan workflow_dispatch di wibu-server
export async function workflowActionList() {
  try {
    // Pastikan options memiliki owner dan repo yang benar
    const repoOptions = {
      ...options,
      owner: "bipproduction",
      repo: "wibu-server",
    };

    // Langkah 1: Dapatkan semua workflows untuk menemukan build.yml
    const workflowsResponse = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/workflows",
      {
        ...repoOptions,
        per_page: 100, // Maksimalkan per halaman untuk efisiensi
      }
    );

    // Temukan workflow build.yml
    const buildWorkflow = workflowsResponse.data.workflows.find(
      (wf) => wf.path === ".github/workflows/build.yml"
    );

    if (!buildWorkflow) {
      throw new Error("Workflow build.yml not found in bipproduction/wibu-server");
    }

    const workflowId = buildWorkflow.id;
    console.log(`Found build.yml in wibu-server with ID: ${workflowId}`);

    // Langkah 2: Dapatkan semua workflow runs untuk build.yml
    const runs = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const runsResponse = await octokit.request(
        "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
        {
          ...repoOptions,
          workflow_id: workflowId,
          per_page: 25, // Sesuai dengan 25 per halaman yang Anda sebutkan sebelumnya
          page: page,
        }
      );

      const workflowRuns = runsResponse.data.workflow_runs;
      runs.push(...workflowRuns);
      console.log(`Fetched page ${page}: ${workflowRuns.length} runs`);

      // Cek apakah ada halaman berikutnya
      const linkHeader = runsResponse.headers.link;
      hasMore = (linkHeader && linkHeader.includes('rel="next"')) as boolean;
      page++;
    }

    // Langkah 3: Filter hanya workflow_dispatch
    const dispatchRuns = runs.filter((run) => run.event === "workflow_dispatch");

    return {
      allRuns: runs,
      dispatchRuns: dispatchRuns,
      totalRuns: runs.length,
      totalDispatchRuns: dispatchRuns.length,
    };
  } catch (error) {
    console.error("Error fetching workflow runs for wibu-server:", error);
    throw error;
  }
}

// Contoh penggunaan
// getWibuServerWorkflowDispatchRuns()
//   .then((result) => {
//     console.log("All Workflow Runs for build.yml:", result.allRuns);
//     console.log("Workflow Dispatch Runs for build.yml:", result.dispatchRuns);
//     console.log("Total Runs:", result.totalRuns);
//     console.log("Total Dispatch Runs:", result.totalDispatchRuns);
//   })
//   .catch((err) => console.error("Error:", err));