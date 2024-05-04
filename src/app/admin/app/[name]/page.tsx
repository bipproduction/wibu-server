import { NavDetailApp } from "@/ui/component/NavDetailApp";
import { TableAppDetail } from "@/ui/component/TableAppDetail";
import app_config from "@/util/app_config";
import { Anchor, Button, Center, Group, Loader, Stack, Title } from "@mantine/core";
import { MdArrowBackIos, MdDelete, MdRestartAlt, MdStop } from "react-icons/md";

export default async function Page({ params }: { params: { name: string } }) {
    const app: { [key: string]: any } = await fetch(app_config.host + '/api/app/list-app/' + params.name, { method: 'GET', cache: 'no-cache' }).then(res => res.json())
    if (!app) return <Center><Loader /></Center>
    return <Stack p={"md"}>
        <Group>
            <Anchor href={'/admin/app'}>
                <Button radius={"lg"} size="compact-xs" leftSection={<MdArrowBackIos />}>Back</Button>
            </Anchor>
        </Group>
        <TableAppDetail data={app} title={params.name} />
    </Stack>
}