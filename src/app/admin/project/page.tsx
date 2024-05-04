import { TableProject } from "@/ui/component/TableProject";
import app_config from "@/util/app_config";
export default async function Page() {
    const res: any[] = await fetch(app_config.host + '/api/app/list-project', {cache: "no-cache"}).then(res => res.json())
    return <>
        <TableProject list={res} />
    </>
}