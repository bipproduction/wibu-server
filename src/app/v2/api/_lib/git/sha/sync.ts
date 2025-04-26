import { v2Octokit, options } from "@/app/v2/_lib/v2-ocktokit";
import { prisma } from "@/lib/prisma";
import { Context } from "elysia";

const gitShaSync = async (context: Context) => {
  const { repoId, branchId } = context.query;

  const repo = await prisma.repos.findUnique({
    where: {
      id: repoId,
    },
  });

  if (!repo) {
    return context.error(404, {
      message: "Repo not found",
    });
  }
  const branch = await prisma.branches.findUnique({
    where: {
      id: branchId,
    },
  });

  if (!branch) {
    return context.error(404, {
      message: "Branch not found",
    });
  }

  const data = await getAllSha({ repo: repo.name, branch: branch.name });
  const transaction = await prisma.$transaction(async (tx) => {
    let count = 0;
    for (const sha of data) {
      await tx.sha.upsert({
        where: {
          id: sha.sha,
        },
        create: {
          id: sha.sha,
          json: sha,
          branchId: branch.id,
          repoId: repo.id,
        },
        update: {
          json: sha,
        },
      });
      count++;
    }
    return count;
  });

  return {
    message: "Synced successfully",
    data: transaction,
  };
};


async function getAllSha({ repo, branch }: { repo: string; branch: string }) {
  const page = 1;
  const per_page = 10;

  const response = await v2Octokit.rest.repos.listCommits({
    owner: options.owner,
    repo,
    sha: branch,
    headers: options.headers,
    per_page,
    page,
  });

  return response.data;
}

export default gitShaSync;


