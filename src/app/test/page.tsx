'use client'
import { useMemo, useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { ActionIcon, Avatar, Badge, Box, Button, Card, Flex, Group, Modal, MultiSelect, Pill, Portal, Select, Stack, Text, TextInput, Title } from '@mantine/core';
import { MdAccountCircle, MdAddCircle, MdEdit, MdRemoveRedEye } from 'react-icons/md';
import toast from 'react-simple-toasts';
import tos from '@/util/tos';
import { useShallowEffect } from '@mantine/hooks';

const board = {
    "id": "q",
    "title": "project A",
    "status": "active", // active , inactive,  archived, trashed, completed, onhold, suspended, inprogress, delayed, canceled, 
    "description": "project A description",
    "createdAt": "2022-03-01T00:00:00.000Z",
    "conclusionAt": "2022-03-01T00:00:00.000Z",
    "task": [
        {
            "id": 'todo',
            "title": 'Todo',
            "items": [
                {
                    "id": '1',
                    "title": "judul 1",
                    "description": '1.1',
                    "archived": {
                        "date": "2022-03-01T00:00:00.000Z",
                        "explain": "reason"
                    },
                    "assigned": [
                        {
                            "id": '1',
                            "title": "user 1",
                        }
                    ]
                },
                {
                    "id": '2',
                    "title": "judul 1",
                    "description": '1.2',
                    "assigned": [
                        {
                            "id": '1',
                            "title": "user 1",
                        }
                    ]
                }
            ]
        },
        {
            "id": 'progress',
            "title": 'Progress',
            "items": [
                {
                    "id": '3',
                    "title": "judul 1",
                    "description": '2.1',
                    "assigned": [
                        {
                            "id": '1',
                            "title": "user 1",
                        }
                    ]
                },
                {
                    "id": '4',
                    "title": "judul 1",
                    "description": '2.2',
                    "assigned": [
                        {
                            "id": '1',
                            "title": "user 1",
                        }
                    ]
                }
            ]
        },
        {
            "id": 'done',
            "title": 'done',
            "items": [
                {
                    "id": "gfgfgdfsds",
                    "title": "judul 1",
                    "description": "_.uniqueId() 1"
                },
                {
                    "id": "gthgj",
                    "title": "judul 1",
                    "description": "_.uniqueId() 2"
                }
            ]
        },
        {
            "id": 'pending',
            "title": 'pending',
            "items": []
        },
        {
            "id": 'archived',
            "title": 'archived',
            "items": [
                {
                    "id": "dsdsdsdsds",
                    "title": "judul 1",
                    "description": "archived 1"
                },
                {
                    "id": "dsdsds",
                    "title": "judul 1",
                    "description": "archived 2"
                }
            ]
        },
        {
            "id": 'trash',
            "title": 'trash',
            "items": [
                {
                    "id": "ddsdsdsds",
                    "title": "judul 1",
                    "description": "trash 1"
                },
                {
                    "id": "eewewew",
                    "title": "judul 1",
                    "description": "trash 2 dsdlfjkfdasfvkjsdmasjvkndamsjvknsdakjsdkvnamjskvdf"
                }
            ]
        }
    ]
}

export default function Page() {
    const [users, setUsers] = useState([])
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
        const sourceListIndex = initial.task.findIndex((list) => list.id === source.droppableId);
        const destinationListIndex = initial.task.findIndex((list) => list.id === destination.droppableId);

        const [removed] = newState.task[sourceListIndex].items.splice(source.index, 1);
        newState.task[destinationListIndex].items.splice(destination.index, 0, removed);

        setInitial(newState);
    }

    const ButtonCreateNew = ({ onValue }: { onValue: (value: { title: string, description: string }) => void }) => {
        const [openModal, setOpenModal] = useState(false)
        const [formTex, setFormTex] = useState({
            id: "",
            title: "",
            description: "",
            assigned: []
        })
        const list_status = [
            "todo",
            "progress",
            "done",
            "trash",
            "archive"
        ]

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
                            // console.log(e)
                            // const assigned = _.cloneDeep(formTex.assigned)
                            // assigned.push(e)
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
                                        c={"white"}
                                        p={"xs"}
                                        bg={id === "todo" ?
                                            "blue" : id === "progress" ?
                                                "green" : id === "done" ?
                                                    "orange" : id === "archived" ?
                                                        "gray" : "red"} >
                                        <Stack gap={"xs"}>
                                            <Flex align={"center"} gap={"xs"}>
                                                <Avatar size={"sm"} bg={"dark"}>
                                                    {index + 1}
                                                </Avatar>
                                                <Text>Title</Text>
                                            </Flex>
                                            <Pill>
                                                <Text fz={"xs"}>{item.description}</Text>
                                            </Pill>
                                            <Flex justify={"space-between"} align={"center"} >
                                                <ButtonEditShow item={item} statusId={id} />
                                                <Avatar.Group>
                                                    <Avatar size={"sm"} bg={"indigo"} color={"white"}>
                                                        MK
                                                    </Avatar>
                                                    <Avatar size={"sm"} bg={"indigo"} color={"white"}>
                                                        MK
                                                    </Avatar>
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
        <Stack p={"md"} gap={"xs"} bg={"gray"}  pos={"relative"} >
            <Title>{initial.title}</Title>
            <Text>{initial.description}</Text>
            {/* {JSON.stringify(users)} */}
            <ButtonCreateNew onValue={(v) => {
                const newState = _.clone(initial)
                const index = newState.task.findIndex((list) => list.id === "todo")
                newState.task[index].items.push({
                    id: _.uniqueId(_.random(10, 100).toString()),
                    title: "sssdss",
                    description: v.title,
                    assigned: []
                })

                setInitial(newState)
            }} />
            <Group >
                <DragDropContext onDragEnd={onDragEnd}>
                    {initial.task.map((list, i) => (
                        <Card key={i} withBorder bg={"dark"} c={"white"}>
                            <Stack w={200} h={500} >
                                <Flex justify={"space-between"}>
                                    <Title order={4}>{list.title}</Title>
                                </Flex>
                                <Box style={{
                                    overflowY: "auto"
                                }}>
                                    <Board key={list.id} list={list.items} droppableId={list.id} id={list.id} />
                                </Box>
                            </Stack>
                        </Card>
                    ))}
                </DragDropContext>
            </Group>
        </Stack>
    );
}
