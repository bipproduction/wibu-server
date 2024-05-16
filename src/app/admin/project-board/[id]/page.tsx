import { CreateProjectView, KanbanBoard } from "@/ui/project_board";

import app_config from "@/util/app_config";
import routePath from "@/util/route_path";
import { Anchor, Center, Stack, Text } from "@mantine/core";

export default async function Page({ params }: { params: { id: string } }) {
    const res = await fetch(app_config.host + routePath.api.projectBoard.byId(params.id).path, { method: routePath.api.projectBoard.byId(params.id).method, cache: 'no-store' }).then(res => res.json())
    if (!res) return <Stack h="100vh" justify="center" align="center" bg={"dark"} c={"white"}>
        <Text>Project Board Not Found</Text>
        <Anchor href="/project-board">CREATE PROJECT BOARD</Anchor>
    </Stack>

    return <Stack>
        <KanbanBoard board={res} id={params.id} />
    </Stack>
}