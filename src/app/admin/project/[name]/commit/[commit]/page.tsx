import { GitCommitDetail } from "@/ui/project/components/GitCommitDetail"
import routePath from "@/util/route_path"
import { getCommitDetailByCommitHash } from "@/util/router_api"
import { Center, Code } from "@mantine/core"

export default async function Page({ params }: { params: { name: string, commit: string } }) {
    const res = await getCommitDetailByCommitHash({ name: params.name, commit: params.commit, isServer: true })
    return <>
        <GitCommitDetail data={res.data} />
    </>
}