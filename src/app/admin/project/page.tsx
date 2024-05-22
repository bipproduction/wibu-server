// import { NavProject } from "@/ui/component/NavProject";
import { PageProject } from "@/ui/project";
// import { TableProject } from "@/ui/project/components/TableProject";
import app_config from "@/util/app_config";
import routePath from "@/util/route_path";
// import { Stack, Title } from "@mantine/core";
export default async function Page() {
    const res = await routePath.api.app.listProject.server().data()
    
    // const res: any[] = await fetch(app_config.host + '/api/app/list-project', { method: 'GET', cache: 'no-store' }).then(res => res.json())
    return <PageProject list={res} />
    // return <Stack p={"md"}>
    //     <Title order={3}>Project</Title>
    //     <NavProject />
    //     <TableProject list={res} />
    // </Stack>
}