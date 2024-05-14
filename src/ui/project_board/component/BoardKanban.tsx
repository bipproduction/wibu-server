'use client'
import { eventAddAssignee } from "@/util/event";
import { Project } from "@/util/project_board_template";
import routePath from "@/util/route_path";
import tos from "@/util/tos";
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";
import { ActionIcon, Avatar, Badge, Box, Button, Card, Flex, Group, Modal, MultiSelect, Pill, Portal, Stack, Text, TextInput, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdAddCircle, MdArrowBackIos, MdEdit, MdRemoveRedEye } from "react-icons/md";
import toast from "react-simple-toasts";
import { v4 } from "uuid";


const colors = [
    {
        id: "backlog",
        bg: "#FF6666", // Warna latar belakang
        text: "#333333" // Warna teks
    },
    {
        id: "todo",
        bg: "#66FF66",
        text: "#333333"
    },
    {
        id: "inprogress",
        bg: "#6699FF",
        text: "#FFFFFF"
    },
    {
        id: "review",
        bg: "#FFCC66",
        text: "#333333"
    },
    {
        id: "done",
        bg: "#FF66CC",
        text: "#333333"
    },
    {
        id: "onhold",
        bg: "#66CCCC",
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


        if (destination.droppableId == "todo") {
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

        setInitial(newState);
        updateBoardProject()
    }

    const ButtonCreateNew = ({ onValue }:
        { onValue: (value: { title: string, description: string, assigned: string[] }) => void }) => {
        const [openModal, setOpenModal] = useState(false)
        const [formTex, setFormTex] = useState<FormCreate>({
            id: "",
            title: "",
            description: "",
            assigned: []
        })

        const onCreate = () => {
            if (formTex.title == "" || formTex.description == "") {
                tos("title and description is required", "warning")
                return
            }
            onValue(formTex)
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

    const ButtonEditShow = ({ item, statusId }: { item: any, statusId: string }) => {
        const [openedit, setOpenedit] = useState(false)
        const [openShow, setOpenShow] = useState(false)
        return <Stack>
            <ActionIcon.Group >
                <ActionIcon onClick={() => setOpenedit(true)} color={"violet"} radius={'lg'}>
                    <MdEdit />
                </ActionIcon>
                <ActionIcon onClick={() => setOpenShow(true)} color={"violet"} radius={'lg'}>
                    <MdRemoveRedEye />
                </ActionIcon>
            </ActionIcon.Group>
            <Portal>
                <Modal title={"EDIT"} opened={openedit} onClose={() => setOpenedit(false)} >
                    <Stack>
                        {/* <TextInput placeholder='title' label={"title"} onChange={(e) => setFormTex({ ...formTex, title: e.target.value })} />
                        <TextInput placeholder='description' label={"description"} onChange={(e) => setFormTex({ ...formTex, description: e.target.value })} />
                        <MultiSelect placeholder='assigned' label={"assigned"} data={users.map((user: any) => ({ label: user.name, value: user.id }))} onChange={(e) => {
                            // console.log(e)
                            // const assigned = _.cloneDeep(formTex.assigned)
                            // assigned.push(e)
                        }} />
                        <Button onClick={onCreate}>Create</Button> */}
                    </Stack>
                </Modal>
            </Portal>
            <Portal>
                <Modal title={"SHOW"} opened={openShow} onClose={() => setOpenShow(false)} >
                    <Stack>
                        <Text>{statusId}</Text>
                        <pre>{JSON.stringify(item, null, 2)}</pre>
                    </Stack>
                </Modal>
            </Portal>
        </Stack>
    }


    const Board = ({ list, droppableId, id }: { list: any[], droppableId: string, id: string }) => {

        return (<Droppable droppableId={droppableId} direction="vertical" >
            {(provided) => (
                <Stack ref={provided.innerRef} {...provided.droppableProps} gap={4} bg={"dark"} h={500}>
                    {list.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index} >
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
                                                <Text>{item.title}</Text>
                                            </Flex>

                                            {/* <Pill>
                                                <Text fz={"xs"}>{item.description}</Text>
                                            </Pill> */}
                                            <Flex justify={"space-between"} align={"center"} >
                                                <ButtonEditShow item={item} statusId={id} />
                                                {/* {JSON.stringify(item.assigned)} */}
                                                <Avatar.Group>
                                                    {item.assigned.map((usr: string, index: number) => (
                                                        <Avatar bg={"dark"} color={"white"} size={"sm"} key={index} >
                                                            {users.find((u) => u.id == usr)?.name.toString().substring(0, 2)}
                                                        </Avatar>
                                                    ))}
                                                </Avatar.Group>
                                            </Flex>
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
        const res = await fetch(routePath.api.projectBoard.update.path, { method: routePath.api.projectBoard.update.method, body: JSON.stringify(initial) })
        if (res.status !== 200) return tos(await res.text(), "error")
        return toast(await res.text(), {
            render: (message) => <div style={{
                color: "white",
                backgroundColor: "green",
                padding: "10px",
            }}>{message}</div>
        })

    }

    const ButtonUpdateBoard = () => {
        const [loadingUpdate, setLoadingUpdate] = useState(false)
        const onUpdateBoard = async () => {
            setLoadingUpdate(true)
            // console.log(JSON.stringify(initial))
            const res = await fetch(routePath.api.projectBoard.update.path, { method: routePath.api.projectBoard.update.method, body: JSON.stringify(initial) })
            if (res.status !== 200) return tos(await res.text(), "error")
            setLoadingUpdate(false)
            return tos(await res.text(), "success")


        }
        return <Stack>
            <Button onClick={onUpdateBoard} size="compact-sm">UPDATE</Button>
        </Stack>
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

    return (
        <Stack p={"md"} gap={"xs"} bg={"#fff9"} pos={"relative"} >
            <Flex gap={"md"} align={"center"} >
                <ActionIcon onClick={() => router.back()}>
                    <MdArrowBackIos />
                </ActionIcon>
                <Title>{initial.title}</Title>
            </Flex>

            <Text>{initial.description}</Text>

            <Flex justify={"space-between"}>
                <ButtonCreateNew onValue={(v) => {
                    const newState = _.clone(initial)
                    const index = newState.columns.findIndex((list) => list.id === "backlog")
                    newState.columns[index].items.push({
                        id: v4(),
                        title: v.title,
                        description: v.title,
                        assigned: v.assigned,
                        progress: 0,
                        createdAt: new Date().toISOString(),
                        estimationAt: "",
                        note: ""
                    })

                    setInitial(newState)
                }} />
                <ButtonUpdateBoard />
            </Flex>

            <Group >
                <DragDropContext onDragEnd={onDragEnd}>
                    {initial.columns.map((item, i) => (
                        <Card key={i} withBorder bg={"dark"} c={"white"}>
                            <Stack w={200} h={500} >
                                <Flex justify={"space-between"}>
                                    <Title c={colors.find((c) => c.id == item.id)?.bg} order={4}>{item.title}</Title>
                                </Flex>
                                <Box style={{
                                    overflowY: "auto"
                                }}>
                                    <Board key={item.id} list={item.items} droppableId={item.id} id={item.id} />
                                </Box>
                            </Stack>
                        </Card>
                    ))}
                </DragDropContext>
            </Group>
            <ModalAssignee />
        </Stack>
    );
}