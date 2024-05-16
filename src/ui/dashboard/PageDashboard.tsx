'use client'
import routePath from "@/util/route_path";
import { Code, Stack } from "@mantine/core";

export function PageDashboard({ listData }: { listData: any }) {
    return <Stack h={"100vh"}>
        <Code>
            <pre>
                {JSON.stringify(listData, null , 2)}
            </pre>
        </Code>
    </Stack>
}