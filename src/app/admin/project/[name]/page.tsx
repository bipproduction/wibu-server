import app_config from "@/util/app_config"
import { Anchor, Badge, Stack, Table } from "@mantine/core"
import { MdArrowBack } from "react-icons/md"
import _ from "lodash"
import { TableProjectDetail } from "@/ui/component/TableProjectDetail"

export default async function Page({ params }: { params: { name: string } }) {
    const res = await fetch(app_config.host + '/api/app/list-project/' + params.name, { method: 'GET', cache: 'no-cache' }).then(res => res.json())

    return <Stack p={"md"}>
        <Anchor href={'/admin/project'}><Badge leftSection={<MdArrowBack />}>Back</Badge></Anchor>
        <TableProjectDetail data={res} title={params.name} />
    </Stack>
}