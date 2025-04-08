/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { octokit, options } from "../bin/okto";

interface RepoData {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stars: number;
  language: string | null;
}

export async function reposSync() {
  try {
    // Mengambil semua repositori
    const allRepos = await fetchAllRepos();
    
    // Batch processing untuk menyimpan ke database
    const batchSize = 100;
    for (let i = 0; i < allRepos.length; i += batchSize) {
      const batch = allRepos.slice(i, i + batchSize);
      for(const repo of batch){
        await prisma.repos.upsert({
          where: {
            full_name: repo.full_name,
          },
          update: {
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description ?? '',
            stars: repo.stars,
            language: repo.language ?? '',
          },
          create: {
            id: repo.full_name,
            name: repo.name,
            full_name: repo.full_name,
            html_url: repo.html_url,
            description: repo.description?? '',
            stars: repo.stars,
            language: repo.language?? ''
          },
        })
      }
    }
    
    console.log(`Successfully synced ${allRepos.length} repositories`);
    return { success: true, count: allRepos.length };
  } catch (error) {
    console.error("Error syncing repositories:", error);
    throw new Error("Failed to sync repositories");
  }
}

async function fetchAllRepos(): Promise<RepoData[]> {
  try {
    let allRepos: RepoData[] = [];
    let page = 1;
    const perPage = 100; // Maksimum yang diizinkan GitHub API per halaman
    let hasMore = true;

    while (hasMore) {
      const repos = await reposGet({ page, per_page: perPage });
      allRepos = allRepos.concat(repos);
      
      // Jika jumlah repo yang dikembalikan kurang dari perPage, 
      // berarti ini halaman terakhir
      if (repos.length < perPage) {
        hasMore = false;
      }
      page++;
    }

    return allRepos;
  } catch (error) {
    console.error("Error fetching all repositories:", error);
    throw new Error("Failed to fetch all repositories from GitHub");
  }
}

export async function reposGet({ page, per_page }: { page: number; per_page: number }): Promise<RepoData[]> {
  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      ...options,
      username: options.owner,
      type: "owner",
      page: Number(page),
      per_page: Number(per_page),
    });

    return response.data.map((repo: any) => ({
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count ?? 0,
      language: repo.language,
    }));
  } catch (error) {
    console.error("Error fetching repositories page:", error);
    throw new Error("Failed to fetch repositories from GitHub");
  }
}