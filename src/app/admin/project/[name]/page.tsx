import app_config from "@/util/app_config"
import { Anchor, Badge, Stack, Table } from "@mantine/core"
import { MdArrowBack } from "react-icons/md"
import _ from "lodash"
import { getPrismaEnvDb } from "@/util/router_api"
import * as Ui from "@/ui/"

export default async function Page({ params }: { params: { name: string } }) {
    const res = await fetch(app_config.host + '/api/app/list-project/' + params.name, { method: 'GET', cache: 'no-cache' }).then(res => res.json())
    const db_info = await getPrismaEnvDb({ name: params.name, isServer: true })
    return <Stack p={"md"}>
        <Anchor href={'/admin/project'}><Badge leftSection={<MdArrowBack />}>Back</Badge></Anchor>
        <Ui.TableProjectDetail data={res} dbInfo={db_info} title={params.name} />
    </Stack>
}