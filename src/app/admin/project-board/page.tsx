import { ProjectBoardPage } from "@/ui/project_board";
import app_config from "@/util/app_config";
import routePath from "@/util/route_path";
import { Stack, Title } from "@mantine/core";

export default async function Page() {
    const res = await fetch(app_config.host + routePath.api.projectBoard.list.path, { cache: "no-store", method: routePath.api.projectBoard.list.method }).then(res => res.json())
    return <Stack>
        <ProjectBoardPage listData={res} />
    </Stack>
}