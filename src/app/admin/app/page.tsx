import { TableApp } from "@/ui/component/TableApp";
import app_config from "@/util/app_config";
import { Stack, Title } from "@mantine/core";

export default async function Page() {
    const res = await fetch(app_config.host + '/api/app/list-app', { cache: "no-store"}).then(res => res.json())
    return <Stack p={"md"}>
        <Title order={3}>App</Title>
        <TableApp data={res} />
    </Stack>
}