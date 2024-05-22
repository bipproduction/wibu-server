'use client'
import { ActionIcon, Anchor, Badge, Box, Button, Center, Checkbox, Flex, Group, Loader, Pill, PillGroup, Stack, Table, Text, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import _ from "lodash";
import { MdCheck, MdClose, MdRestartAlt, MdSearch, MdSort } from "react-icons/md";
import { eventLoadProject } from "@/util/event";
import routePath from "@/util/route_path";

interface MODEL_TABLE_PROJECT {
    name: string
    branch: string
    app: string
    type: string
    prisma: string
    seed: string
}


export function TableProject({ list }: { list: any[] }) {
    const [listProject, setListProject] = useState<MODEL_TABLE_PROJECT[] | null>(list)
    const [listProjectClone, setListProjectClone] = useState<any[] | null>(list)
    const [sort_asc, setSort_asc] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)

    useShallowEffect(() => {
        loadList()
        eventLoadProject.on("load", () => {
            loadList()
        })
    }, [])

    const loadList = async () => {
        setLoading(true)
        // const res: any[] = await fetch('/api/app/list-project', { cache: "no-store" }).then(res => res.json())
        const res = await routePath.api.app.listProject.data()
        setListProject(res)
        setListProjectClone(res)
        setLoading(false)
    }

    const onSearch = (value: string) => {
        const listSearch = listProjectClone!.filter(item => _.values(item)[0].toLowerCase().includes(value.toLowerCase()))
        setListProject(listSearch)
    }


    const onSort = () => {
        const listSort = _.orderBy(listProjectClone!, ['name'], [sort_asc ? 'desc' : 'asc'])
        setListProject(listSort)
        setSort_asc(!sort_asc)
    }

    const onRestart = () => {
        loadList()
    }

    if (!listProject) return <Center p={"lg"}><Loader /></Center>
    const MainView = () => {
        return <Stack gap={"md"} >
            <Flex justify="end" gap={"md"} p={"sm"} align={"center"}>
                {/* <Checkbox defaultChecked={true} label="package" /> */}
                <TextInput size="xs" leftSection={<MdSearch />} placeholder="search" onChange={(e) => onSearch(e.target.value)} />
                <ActionIcon onClick={onRestart} loading={loading}>
                    <MdRestartAlt />
                </ActionIcon>
            </Flex>
            <Stack style={{
                overflowX: "auto"
            }} >

                <Table striped highlightOnHover border={1}>
                    <Table.Thead>
                        <Table.Tr bg={"dark"} c={"white"} >
                            <Table.Th>#</Table.Th>
                            {_.keys(listProject[0]).map(key => <Table.Th key={key}>{key === "name" ? <Flex justify={"space-between"}>
                                <Text>name</Text>
                                <ActionIcon onClick={onSort}>
                                    <MdSort />
                                </ActionIcon>
                            </Flex> : key}</Table.Th>)}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {listProject?.map((item, index) => <Table.Tr key={index}>
                            <Table.Td>{index + 1}</Table.Td>
                            <Table.Td><Anchor href={`/admin/project/${item.name}`} >{item.name}</Anchor></Table.Td>
                            <Table.Td>{item.branch}</Table.Td>
                            <Table.Td>{item.app}</Table.Td>
                            <Table.Td>{item.type}</Table.Td>
                            <Table.Td>{item.prisma}</Table.Td>
                            <Table.Td>{item.seed}</Table.Td>
                            
                        </Table.Tr>)}
                    </Table.Tbody>
                </Table>
            </Stack>
        </Stack>
    }


    return <MainView />

}
