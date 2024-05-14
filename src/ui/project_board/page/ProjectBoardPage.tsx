
import routePath from "@/util/route_path";
import { ActionIcon, Anchor, Badge, Button, Card, Center, Flex, Loader, Pill, Stack, Table, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
// import { useRouter } from "next/router";
import { useState } from "react";
import { MdArrowBackIos, MdRemoveRedEye } from "react-icons/md";

export function ProjectBoardPage() {
    const [listProjectBoard, setlistProjectBoard] = useState<any[] | null>(null)
    // const route = useRouter()

    useShallowEffect(() => {
        loadListProjectBoard()
    }, [])
    const loadListProjectBoard = async () => {
        const res = await fetch(routePath.api.projectBoard.list.path, { cache: "no-store", method: routePath.api.projectBoard.list.method }).then(res => res.json())
        setlistProjectBoard(res)
    }
    return <Stack p={"md"}>
        <Flex gap={"md"}>
            {/* <ActionIcon onClick={() => route.back()}>
                <MdArrowBackIos />
            </ActionIcon> */}
            <Title>Project Board</Title>
        </Flex>
        <Table highlightOnHover border={1} >
            <Table.Thead bg={"dark"} c={"white"}>
                <Table.Tr>
                    <Table.Th>title</Table.Th>
                    <Table.Th>description</Table.Th>
                    <Table.Th>parentProject</Table.Th>
                    <Table.Th>initiatedAt</Table.Th>
                    <Table.Th>conclusionAt</Table.Th>
                    <Table.Th>action</Table.Th>
                </Table.Tr>
            </Table.Thead>
            {!listProjectBoard && <Table.Tbody><Table.Tr><Table.Td colSpan={6}>
                <Center>
                    <Loader />
                </Center>
            </Table.Td></Table.Tr></Table.Tbody>}
            <Table.Tbody>
                {
                    listProjectBoard?.map((item, index) => {
                        return <Table.Tr key={index}>
                            <Table.Td>{item.title}</Table.Td>
                            <Table.Td>{item.description}</Table.Td>
                            <Table.Td>{item.parentProject}</Table.Td>
                            <Table.Td>{moment(item.initiatedAt).format("DD MMM YYYY")}</Table.Td>
                            <Table.Td>{moment(item.conclusionAt).format("DD MMM YYYY")}</Table.Td>
                            <Table.Td>
                                <Anchor href={routePath.page.projectBoard.byId(item.id).path}>
                                    <ActionIcon>
                                        <MdRemoveRedEye />
                                    </ActionIcon>
                                </Anchor>
                            </Table.Td>
                        </Table.Tr>
                    })
                }

            </Table.Tbody>
        </Table>

    </Stack>
}