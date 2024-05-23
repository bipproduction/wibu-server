'use client'
import { eventAddAssignee } from "@/util/event";
import { Project } from "@/util/project_board_template";
import routePath from "@/util/route_path";
import tos from "@/util/tos";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";
import { ActionIcon, Avatar, Badge, Box, Button, ButtonGroup, Card, Chip, Code, Flex, Group, Loader, Modal, MultiSelect, Pill, Portal, Stack, Table, Text, TextInput, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdAddCircle, MdArrowBackIos, MdArrowDropDown, MdArrowDropUp, MdArrowForwardIos, MdEdit, MdRemoveRedEye } from "react-icons/md";
import toast from "react-simple-toasts";
import { v4 } from "uuid";


const colors = [
    {
        id: "backlog",
        bg: "red", // Warna latar belakang
        text: "#fff" // Warna teks
    },
    {
        id: "todo",
        bg: "teal",
        text: "#333333"
    },
    {
        id: "inprogress",
        bg: "blue",
        text: "#FFFFFF"
    },
    {
        id: "review",
        bg: "orange",
        text: "#333333"
    },
    {
        id: "done",
        bg: "pink",
        text: "#333333"
    },
    {
        id: "onhold",
        bg: "cyan",
        text: "#333333"
    },
    {
        id: "trash",
        bg: "#666666",
        text: "#FFFFFF"
    },
    {
        id: "archive",
        bg: "#999999",
        text: "#333333"
    }
];


type FormCreate = {
    id: string
    title: string
    description: string
    assigned: string[]
}


export function KanbanBoard({ board, id }: { board: Project, id: string }) {
    const [users, setUsers] = useState<any[]>([])
    const [initial, setInitial] = useState(board);
    const [openModalAssigne, setOpenModalAssigne] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const router = useRouter()

    useShallowEffect(() => {
        loadUser()
        loadBoard()
    }, [])

    const loadUser = async () => {
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsers(data)
    }

    const loadBoard = async () => {
        try {
            const res = await fetch(routePath.api.projectBoard.byId(id).path, { method: routePath.api.projectBoard.byId(id).method, cache: 'no-store' }).then(res => res.json())
            setInitial(res)
        } catch (error) {

        }
    }

    const onDragEnd = async (result: any) => {
        const { combine, destination, draggableId, mode, source, reason, type } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const newState = initial;
        const sourceListIndex = initial.columns.findIndex((list) => list.id === source.droppableId);
        const destinationListIndex = initial.columns.findIndex((list) => list.id === destination.droppableId);

        const [removed] = newState.columns[sourceListIndex].items.splice(source.index, 1);
        newState.columns[destinationListIndex].items.splice(destination.index, 0, removed);


        if (destination.droppableId !== "backlog") {
            const item = newState.columns[destinationListIndex].items.find((item: any) => item.id == draggableId)
            const index = newState.columns[destinationListIndex].items.findIndex((item: any) => item.id == draggableId)
            if (item.assigned.length == 0) {
                setOpenModalAssigne(true)
                const success: boolean = await new Promise((resolve) => {
                    eventAddAssignee.on("success", (data) => {
                        newState.columns[destinationListIndex].items[index].assigned = data
                        setOpenModalAssigne(false)
                        resolve(true)
                    })


                    eventAddAssignee.on("cancel", () => {
                        loadBoard()
                        resolve(false)
                    })
                })

                if (!success) {
                    loadBoard()
                    return
                }
            }

        }

        // console.log(destination)
        const index = newState.columns[destinationListIndex].items.findIndex((item: any) => item.id == draggableId)
        // [destination.droppableId]
        const des = (newState.columns[destinationListIndex].items[index]['history']) ?? null
        if (!des) {


            newState.columns[destinationListIndex].items[index]['history'] = {}
            // [destination.droppableId]

        }

        if (!newState.columns[destinationListIndex].items[index]['history'][destination.droppableId]) {

            newState.columns[destinationListIndex].items[index]['history'][destination.droppableId] = []
        }

        newState.columns[destinationListIndex].items[index]['history'][destination.droppableId].push({
            id: v4(),
            date: new Date().toISOString(),
            note: ""
        })

        setInitial(newState);
        updateBoardProject()
    }

    const ButtonCreateNew = () => {
        const [openModal, setOpenModal] = useState(false)
        const [formTex, setFormTex] = useState<FormCreate>({
            id: "",
            title: "",
            description: "",
            assigned: []
        })

        const onCreate = async () => {
            if (formTex.title == "" || formTex.description == "") {
                tos("title and description is required", "warning")
                return
            }

            const newState = _.clone(initial)
            const index = newState.columns.findIndex((list) => list.id === "backlog")
            newState.columns[index].items.push({
                id: v4(),
                title: formTex.title,
                description: formTex.title,
                assigned: formTex.assigned,
                createdAt: new Date().toISOString(),
                sttartAt: "",
                estimationAt: "",
                note: "",
                progress: 0
            })

            setInitial(newState)
            updateBoardProject()
            setOpenModal(false)

        }
        return <Stack>
            <Group>
                <ActionIcon onClick={() => setOpenModal(true)}>
                    <MdAddCircle />
                </ActionIcon>
            </Group>
            <Portal>
                <Modal title={"CREATE NEW"} opened={openModal} onClose={() => setOpenModal(false)} >
                    <Stack>
                        <TextInput placeholder='title' label={"title"} onChange={(e) => setFormTex({ ...formTex, title: e.target.value })} />
                        <TextInput placeholder='description' label={"description"} onChange={(e) => setFormTex({ ...formTex, description: e.target.value })} />
                        <MultiSelect placeholder='assigned' label={"assigned"} data={users.map((user: any) => ({ label: user.name, value: user.id }))} onChange={(e) => {
                            setFormTex({ ...formTex, assigned: e })
                        }} />
                        <Button onClick={onCreate}>Create</Button>
                    </Stack>
                </Modal>
            </Portal>
        </Stack>
    }

    const MenuItemBoard = ({ data }: { data: { [key: string]: any } }) => {
        const [openEdit, setOpenEdit] = useState(false)
        const [openDrop, setOpenDrop] = useState(false)

        const EditBox = () => {
            return <Card>
                <Stack>
                    <TextInput value={data.title} placeholder='title' label={"title"} />
                    <TextInput value={data.description} placeholder='description' label={"description"} />
                    <MultiSelect placeholder='assigned' label={"assigned"} data={users.map((user: any) => ({ label: user.name, value: user.id }))} />
                    <Group>
                        <Button>UPDATE</Button>
                    </Group>
                </Stack>
            </Card>

        }

        const ShowBox = () => {
            return <Card>
                <Stack gap={"xs"}>
                    <Text>show</Text>
                    {_.keys(data).map((key, i) => <Box key={i}>{key} : {typeof data[key] === "object" ? <Code>
                        {JSON.stringify(data[key], null, 2)}
                    </Code> : data[key]}</Box>)}
                </Stack>
            </Card>
        }

        return <Stack gap={"xs"}>
            <Flex gap={"xs"}>
                <ActionIcon onClick={() => {
                    setOpenEdit(!openEdit)
                    if (openDrop) setOpenDrop(!openDrop)
                }} size={"sm"} bg={"dark"} c={openEdit ? "blue" : "white"}>
                    <MdEdit />
                </ActionIcon>
                <ActionIcon onClick={() => {
                    setOpenDrop(!openDrop)
                    if (openEdit) setOpenEdit(!openEdit)
                }} size={"sm"} bg={"dark"} c={openDrop ? "blue" : "white"}>
                    {openDrop ? <MdArrowDropUp /> : <MdArrowDropDown />}
                </ActionIcon>
            </Flex>
            <Box>
                {(!openEdit && !openDrop) ? null : openEdit ? <EditBox /> : <ShowBox />}
            </Box>
        </Stack>
    }


    const Board = ({ list, droppableId, id }: { list: any[], droppableId: string, id: string }) => {
        return (<Droppable droppableId={droppableId} direction="vertical"  >
            {(provided) => (
                <Stack p={"xs"} pos={"relative"} w={400} mih={300} ref={provided.innerRef} {...provided.droppableProps} gap={4} bg={"black"} style={{
                    overflow: "auto",

                }}>
                    {list.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}  >
                            {(provided) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Card
                                        withBorder
                                        c={colors.find((c) => c.id == id)?.text}
                                        p={"xs"}
                                        bg={colors.find((c) => c.id == id)?.bg} >
                                        <Stack gap={"xs"}>
                                            <Flex align={"center"} gap={"xs"}>
                                                <Avatar size={"sm"} bg={"dark"}>
                                                    {index + 1}
                                                </Avatar>
                                                <Text fw={"bold"} lineClamp={2}>{item.title}</Text>
                                            </Flex>

                                            {/* <Pill>
                                                <Text fz={"xs"}>{item.description}</Text>
                                            </Pill> */}
                                            <Flex justify={"space-between"} align={"center"} gap={"md"}>

                                                <Pill>
                                                    <Text fz={"sm"}>{moment(item.createdAt).diff(moment(), 'days') + " days ago"}</Text>
                                                </Pill>
                                                <Avatar.Group>
                                                    {item.assigned.map((usr: string, index: number) => (
                                                        <Avatar bg={"dark"} color={"white"} size={"sm"} key={index} >
                                                            {_.upperCase(users.find((u) => u.id == usr)?.name.toString().substring(0, 2))}
                                                        </Avatar>
                                                    ))}
                                                </Avatar.Group>
                                            </Flex>
                                            <MenuItemBoard data={item} />
                                        </Stack>
                                    </Card>
                                </Box>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </Stack>
            )}
        </Droppable>
        );
    }


    const updateBoardProject = async () => {
        setLoadingUpdate(true)
        const res = await fetch(routePath.api.projectBoard.update.path, { method: routePath.api.projectBoard.update.method, body: JSON.stringify(initial) })
        if (res.status !== 200) {
            setLoadingUpdate(false)
            return tos(await res.text(), "error")
        }
        setLoadingUpdate(false)

    }

    const ModalAssignee = () => {
        const [listUsser, setListuser] = useState<any[]>([])
        const onSelected = () => {
            if (listUsser.length === 0) {
                tos("select user please", "warning")
                return
            }
            eventAddAssignee.emit("success", listUsser)
        }
        return <Portal>
            <Modal title="Assignee" opened={openModalAssigne} onClose={() => {
                eventAddAssignee.emit("cancel")
                setOpenModalAssigne(false)
            }}>
                <Stack>
                    <MultiSelect
                        placeholder='assigned'
                        label={"assigned"}
                        data={users.map((user: any) => ({ label: user.name, value: user.id }))}
                        onChange={(v) => {
                            setListuser(v)
                        }}
                    />
                    <Button onClick={onSelected}>Create</Button>
                </Stack>
            </Modal>
        </Portal>
    }



    const DragBoard = (item: any) => {
        const ButtonHideDisplay = ({ onClick }: { onClick: () => void }) => {
            return <ActionIcon onClick={onClick}>
                <MdArrowBackIos />
            </ActionIcon>
        }
        const onClickHideButton = async (item: any) => {

            const newState = _.clone(initial)
            const index = newState.columns.findIndex((i) => i.id == item.id)
            newState.columns[index].display = false
            setInitial(newState)
            await updateBoardProject()
        }

        return <Stack style={{
            overflowX: "scroll"
        }} >
            <DragDropContext onDragEnd={onDragEnd} >
                <Flex gap={"xs"} >
                    {initial.columns.map((item, i) => (
                        <Stack display={item.display ? "block" : "none"} key={i}  >
                            <Flex justify={"space-between"} align={"center"} p={"xs"} bg={"dark"}>
                                <Badge bg={colors.find((c) => c.id == item.id)?.bg} >
                                    <Text c={colors.find((c) => c.id == item.id)?.text}>{item.title}</Text>
                                </Badge>
                                <Badge>{item.items.length}</Badge>
                                <ButtonHideDisplay onClick={() => onClickHideButton(item)} />
                            </Flex>
                            <Board key={item.id} list={item.items} droppableId={item.id} id={item.id} />
                        </Stack>
                    ))}
                </Flex>
            </DragDropContext>
        </Stack>
    }


    const ButtonMenuListDisplay = () => {

        const onClick = async (item: any) => {


            const newState = _.clone(initial)
            const index = newState.columns.findIndex((i) => i.id == item.id)
            newState.columns[index].display = true
            setInitial(newState)
            await updateBoardProject()
        }

        return <Flex wrap={"wrap"} gap={"sm"} align={"center"}>
            {initial.columns.map((item, i) => (
                <Button
                    leftSection={<Pill>{item.items.length}</Pill>}
                    bg={colors.find((c) => c.id == item.id)?.bg}
                    c={colors.find((c) => c.id == item.id)?.text}
                    onClick={() => onClick(item)}
                    display={!item.display ? "block" : "none"}
                    key={i}
                >{item.title}</Button>
            ))}
        </Flex>
    }

    return (
        <Stack p={"md"} gap={"xs"} bg={"#fff9"} >
            <Flex gap={"md"} align={"center"} >
                <ActionIcon onClick={() => router.back()}>
                    <MdArrowBackIos />
                </ActionIcon>
                <Title>{initial.title}</Title>
            </Flex>
            <Table highlightOnHover border={1}>
                <Table.Thead bg={"dark"} c={"white"}>
                    <Table.Tr>
                        <Table.Th>status</Table.Th>
                        <Table.Th>created At</Table.Th>
                        <Table.Th>initiated At</Table.Th>
                        <Table.Th>conclusion At</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td><Badge>
                            {initial.status}
                        </Badge>
                        </Table.Td>
                        <Table.Td>
                            <Group>
                                {moment(initial.createdAt).format("DD MMM YYYY")}
                                <Badge>{Math.abs(moment(initial.createdAt).diff(moment(), 'days')) + " days ago"}</Badge>
                            </Group>
                        </Table.Td>
                        <Table.Td>
                            <Group>
                                {moment(initial.initiatedAt).format("DD MMM YYYY")}
                                <Badge>{Math.abs(moment(initial.initiatedAt).diff(moment(), 'days')) + " days ago"}</Badge>
                            </Group>
                        </Table.Td>
                        <Table.Td>
                            <Group>
                                {moment(initial.conclusionAt).format("DD MMM YYYY")}
                                <Badge>{Math.abs(moment().diff(moment(initial.conclusionAt), 'days')) + "days more"}</Badge>
                            </Group>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
            <Text>{initial.description}</Text>

            <Flex justify={"space-between"}>
                <ButtonCreateNew />
                {loadingUpdate && <Loader size="xs" />}
            </Flex>
            <ButtonMenuListDisplay />
            <DragBoard />

            <ModalAssignee />
        </Stack>
    );
}