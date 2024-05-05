import { NavProject } from "@/ui/component/NavProject";
import { TableProject } from "@/ui/component/TableProject";
import app_config from "@/util/app_config";
import { Stack, Title } from "@mantine/core";
export default async function Page() {
    const res: any[] = await fetch(app_config.host + '/api/app/list-project', { cache: "no-cache" }).then(res => res.json())
    return <Stack p={"md"}>
        <Title order={3}>Project</Title>
        <NavProject />
        <TableProject list={res} />
    </Stack>
}