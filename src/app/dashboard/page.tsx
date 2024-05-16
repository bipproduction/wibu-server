import { PageDashboard } from "@/ui/dashboard";
import routePath from "@/util/route_path";
import { Stack, Text } from "@mantine/core";

export default async function Page() {
    const list_app = await routePath.api.app.listApp.server().data()
    const list_project = await routePath.api.app.listProject.server().data()
    const list_server = await routePath.api.app.listServer.server().data()
    const list_project_board = await routePath.api.projectBoard.list.server().data()

    const listData = {
        list_app,
        list_project,
        list_server,
        list_project_board
    }

    return <PageDashboard listData={listData} />
}