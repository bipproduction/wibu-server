'use client'
import { Project } from "@/util/project_board_template";
import tos from "@/util/tos";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Avatar, Box, Button, Card, Flex, Group, Modal, MultiSelect, Pill, Portal, Stack, Text, TextInput, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdAddCircle, MdEdit, MdRemoveRedEye } from "react-icons/md";

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


export default function KanbanBoard({ board }: { board: Project }) {
    const [users, setUsers] = useState<any[]>([])
    const [initial, setInitial] = useState(board);

    useShallowEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () => {
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsers(data)
    }

    const onDragEnd = (result: any) => {
        const { destination, source } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const newState = initial;
        const sourceListIndex = initial.columns.findIndex((list) => list.id === source.droppableId);
        const destinationListIndex = initial.columns.findIndex((list) => list.id === destination.droppableId);

        const [removed] = newState.columns[sourceListIndex].items.splice(source.index, 1);
        newState.columns[destinationListIndex].items.splice(destination.index, 0, removed);

        setInitial(newState);
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

    return (
        <Stack p={"md"} gap={"xs"} bg={"gray"} pos={"relative"} >
            <Title>{initial.title}</Title>
            <Text>{initial.description}</Text>
            {/* {JSON.stringify(users)} */}
            <ButtonCreateNew onValue={(v) => {
                const newState = _.clone(initial)
                const index = newState.columns.findIndex((list) => list.id === "backlog")
                newState.columns[index].items.push({
                    id: _.uniqueId(_.random(10, 100).toString()),
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
        </Stack>
    );
}