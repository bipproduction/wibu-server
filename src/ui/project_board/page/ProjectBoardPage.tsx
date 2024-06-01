'use client'
import routePath from "@/util/route_path";
import { ActionIcon, Anchor, Badge, Button, Card, Center, Flex, Group, Loader, Modal, Pill, Portal, Stack, Table, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
// import { useRouter } from "next/router";
import { useState } from "react";
import { MdArrowBackIos, MdDelete, MdRemove, MdRemoveRedEye } from "react-icons/md";
import { CreateProjectView } from "../component";
import tos from "@/util/tos";

export function ProjectBoardPage({ listData }: { listData: any[] }) {
    const [listProjectBoard, setlistProjectBoard] = useState<any[] | null>(listData)
    // const route = useRouter()

    useShallowEffect(() => {
        loadListProjectBoard()
    }, [])
    const loadListProjectBoard = async () => {
        const res = await fetch(routePath.api.projectBoard.list.path, { method: routePath.api.projectBoard.list.method }).then(res => res.json())
        setlistProjectBoard(res)
    }

    const ButtonDeleteProject = ({ data }: { data: any }) => {
        const [openDelete, setOpenDelete] = useState(false)
        return <Stack>
            <ActionIcon onClick={() => setOpenDelete(true)}>
                <MdDelete />
            </ActionIcon>
            <Portal>
                <Modal title="Delete Project" opened={openDelete} onClose={() => setOpenDelete(false)}>
                    <Stack>
                        <Title order={3}>Are you sure you want to delete this project?</Title>
                        <Group>
                            <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                            <Button color="red" onClick={() => {
                                fetch(routePath.api.projectBoard.delete.path, {
                                    method: routePath.api.projectBoard.delete.method,
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({ id: data.id })
                                }).then(async (res) => {
                                    const message = await res.text()
                                    if (res.status == 200) {
                                        tos(message, "success")
                                        setOpenDelete(false)
                                        loadListProjectBoard()
                                        return
                                    }

                                    tos(message, "error")

                                })

                            }}
                            >Delete</Button>
                        </Group>
                    </Stack>
                </Modal>
            </Portal>
        </Stack>
    }
    return <Stack p={"md"}>
        <Title>Project Board</Title>
        <CreateProjectView onSuccess={loadListProjectBoard} />
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
                                <Flex gap={"md"}>
                                    <Anchor href={routePath.page.projectBoard.byId(item.id).path}>
                                        <ActionIcon>
                                            <MdRemoveRedEye />
                                        </ActionIcon>
                                    </Anchor>
                                    <ButtonDeleteProject data={item} />
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                    })
                }

            </Table.Tbody>
        </Table>

    </Stack>
}