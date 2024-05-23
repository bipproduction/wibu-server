import { NavServer } from "@/ui/component/NavServer";
import { TableServer } from "@/ui/component/TableServer";
import app_config from "@/util/app_config";
import { Button, Stack, Title } from "@mantine/core";

export default async function Page() {
    const res = await fetch(app_config.host + '/api/app/list-server', { cache: "no-store" }).then(res => res.json())
    return <Stack p={"md"}>
        <Title order={3}>Server</Title>
        <TableServer data={res} />
    </Stack>
}