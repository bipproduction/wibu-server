import app_config from "@/util/app_config";
 export const gen_api = {
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/users/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/users/route.ts)
 */
users : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/users/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/test/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/test/route.ts)
 */
test : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/test/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/update/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/update/route.ts)
 */
projectBoardUpdate : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/project-board/update/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/search/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/search/route.ts)
 */
projectBoardSearch : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/project-board/search/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/list/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/list/route.ts)
 */
projectBoardList : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/project-board/list/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/delete/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/delete/route.ts)
 */
projectBoardDelete : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/project-board/delete/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/create/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/create/route.ts)
 */
projectBoardCreate : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/project-board/create/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/[id]/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project-board/[id]/route.ts)
 */
projectBoardIdById : async ({id, isServer}: {id: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/project-board/${id}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project/git-commit/[name]/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project/git-commit/[name]/route.ts)
 */
projectGitCommitNameByName : async ({name, isServer}: {name: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/project/git-commit/${name}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project/git-commit/[name]/[commit]/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project/git-commit/[name]/[commit]/route.ts)
 */
projectGitCommitNameCommitByNameByCommit : async ({name, commit, isServer}: {name: string, commit: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/project/git-commit/${name}/${commit}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project/[name]/git/remote-branch/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project/[name]/git/remote-branch/route.ts)
 */
projectNameGitRemoteBranchByName : async ({name, isServer}: {name: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/project/${name}/git/remote-branch/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/project/[name]/db/schema/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/project/[name]/db/schema/route.ts)
 */
projectNameDbSchemaByName : async ({name, isServer}: {name: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/project/${name}/db/schema/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/prisma/env/[name]/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/prisma/env/[name]/route.ts)
 */
prismaEnvNameByName : async ({name, isServer}: {name: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/prisma/env/${name}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/update-branch/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/update-branch/route.ts)
 */
binProjectUpdateBranch : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/update-branch/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/studio/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/studio/route.ts)
 */
binProjectStudio : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/studio/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/start/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/start/route.ts)
 */
binProjectStart : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/start/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/seed/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/seed/route.ts)
 */
binProjectSeed : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/seed/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/pull/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/pull/route.ts)
 */
binProjectPull : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/pull/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/install/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/install/route.ts)
 */
binProjectInstall : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/install/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/db-push/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/db-push/route.ts)
 */
binProjectDbPush : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/db-push/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/clean/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/clean/route.ts)
 */
binProjectClean : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/clean/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/build/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/build/route.ts)
 */
binProjectBuild : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/build/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/add/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/project/add/route.ts)
 */
binProjectAdd : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/project/add/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/app/stop/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/app/stop/route.ts)
 */
binAppStop : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/app/stop/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/app/restart/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/app/restart/route.ts)
 */
binAppRestart : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/app/restart/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/app/log/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/app/log/route.ts)
 */
binAppLog : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/app/log/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/app/delete/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/bin/app/delete/route.ts)
 */
binAppDelete : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/bin/app/delete/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/auth/user/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/auth/user/route.ts)
 */
authUser : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/user/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/auth/logout/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/auth/logout/route.ts)
 */
authLogout : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/logout/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/auth/login/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/auth/login/route.ts)
 */
authLogin : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/auth/login/`, { method: 'POST',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-server/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-server/route.ts)
 */
appListServer : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/app/list-server/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-project/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-project/route.ts)
 */
appListProject : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/app/list-project/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-project/app/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-project/app/route.ts)
 */
appListProjectApp : async ({isServer,body}: {isServer?: boolean, body: { name: string }}) => {

    return fetch(`${isServer && app_config.host || ''}/api/app/list-project/app/`, { method: 'POST', body: JSON.stringify(body),  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-project/[name]/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-project/[name]/route.ts)
 */
appListProjectNameByName : async ({name, isServer}: {name: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/app/list-project/${name}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-app/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-app/route.ts)
 */
appListApp : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/app/list-app/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-app/search/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-app/search/route.ts)
 */
appListAppSearch : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/app/list-app/search/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-app/port-available/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-app/port-available/route.ts)
 */
appListAppPortAvailable : async ({isServer}: {isServer?: boolean}) => {

    return fetch(`${isServer && app_config.host || ''}/api/app/list-app/port-available/`, { method: 'GET',   cache: 'no-cache' })
        .then(res => res.json());
}
,
/**
 *  [/Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-app/[name]/route.ts](file:///Users/bip/Documents/projects/bip/wibu-server/src/app/api/app/list-app/[name]/route.ts)
 */
appListAppNameByName : async ({name, isServer}: {name: string, isServer?: boolean}) => {
   
    return fetch(`${isServer && app_config.host || ''}/api/app/list-app/${name}/`, { method: 'GET',  cache: 'no-cache' })
        .then(res => res.json());
}
};