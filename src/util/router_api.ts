import app_config from "./app_config";

export async function getListGitCommit({ name, isServer }: { name: string, isServer?: boolean }): Promise<any[]> {
    return fetch(`${isServer && app_config.host || ''}/api/project/git-commit/` + name, { method: 'GET', cache: 'no-cache' }).then(res => res.json())
}

export async function getCommitDetailByCommitHash({ name, commit, isServer }: { name: string, commit: string, isServer?: boolean }): Promise<any> {
    return fetch(`${isServer && app_config.host || ''}/api/project/git-commit/` + name + '/' + commit, { method: 'GET', cache: 'no-cache' }).then(res => res.json())
}

export async function getPrismaEnvDb({ name, isServer }: { name: string, isServer?: boolean }): Promise<any> {
    return fetch(`${isServer && app_config.host || ''}/api/prisma/env/` + name, { method: 'GET', cache: 'no-cache' }).then(res => res.json())
}

