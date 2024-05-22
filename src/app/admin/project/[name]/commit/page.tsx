import { GitCommitView } from "@/ui";
import { getListGitCommit } from "@/util/router_api";

export default async function Page({ params }: { params: { name: string } }) {
    const res = await getListGitCommit({ name: params.name, isServer: true })
    return <GitCommitView title={params.name} data={res} />
}