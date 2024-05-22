export function goToCommitDetail({name, commit}:{name: string, commit: string}) {
    return `/admin/project/${name}/commit/${commit}`
}