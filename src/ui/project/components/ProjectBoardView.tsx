'use client'
import routePath from "@/util/route_path"
import { Anchor, Card, Flex, Loader, Stack, Text, Title } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"

export const ProjectBoardView = ({ title }: { title: string }) => {
    const [listProjectBoard, setlistProjectBoard] = useState<any[] | null>(null)
    useShallowEffect(() => {
        loadList()
    }, [])

    const loadList = async () => {
        const res = await fetch(routePath.api.projectBoard.search(title).path, { method: routePath.api.projectBoard.search(title).method }).then(res => res.json())
        setlistProjectBoard(res)
    }
    return <Card withBorder>
        <Stack gap={"xs"}>
            <Text fw={"bold"}>Project Board</Text>
            <Flex gap={"md"} >
                {!listProjectBoard ? <Loader size={"sm"} /> : listProjectBoard.map((itm, i) => <Anchor key={i.toString()} href={routePath.page.projectBoard.byId(itm.id).path}>
                    <Text>{itm.title}</Text>
                </Anchor>)}
            </Flex>
        </Stack>
    </Card>
}