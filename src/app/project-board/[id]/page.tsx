import KanbanBoard from "@/ui/project_board/component/BoardKanban";
import app_config from "@/util/app_config";
import routePath from "@/util/route_path";
import { Stack, Text } from "@mantine/core";

export default async function Page({ params }: { params: { id: string } }) {
    const res = await fetch(app_config.host + routePath.api.projectBoard.byId(params.id).path, { method: routePath.api.projectBoard.byId(params.id).method, cache: 'no-store' }).then(res => res.json())
    return <Stack>
        <KanbanBoard board={res} />
    </Stack>
}