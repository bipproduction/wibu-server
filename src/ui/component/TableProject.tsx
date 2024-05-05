'use client'
import { ActionIcon, Anchor, Badge, Box, Button, Center, Checkbox, Flex, Group, Loader, Pill, PillGroup, Stack, Table, Text, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import _ from "lodash";
import { MdCheck, MdClose, MdRestartAlt, MdSearch, MdSort } from "react-icons/md";
import { eventLoadProject } from "@/util/event";

export function TableProject({ list }: { list: any[] }) {
    const [listProject, setListProject] = useState<any[] | null>(list)
    const [listProjectClone, setListProjectClone] = useState<any[] | null>(list)
    const [sort_asc, setSort_asc] = useState<boolean>(true)

    useShallowEffect(() => {
        loadList()
        eventLoadProject.on("load", () => {
            loadList()
        })
    }, [])

    const loadList = async () => {
        const res: any[] = await fetch('/api/app/list-project').then(res => res.json())
        setListProject(res)
        setListProjectClone(res)
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
    return <Stack gap={"md"} >
        <Flex justify="end" gap={"md"} p={"sm"} align={"center"}>
            {/* <Checkbox defaultChecked={true} label="package" /> */}
            <TextInput size="xs" leftSection={<MdSearch />} placeholder="search" onChange={(e) => onSearch(e.target.value)} />
            <ActionIcon onClick={onRestart}>
                <MdRestartAlt />
            </ActionIcon>
        </Flex>
        <Stack style={{
            overflowX: "auto"
        }} >

            <Table striped highlightOnHover border={1}>
                <Table.Thead>
                    <Table.Tr bg={"dark"} c={"white"}>
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
                        {_.values(item).map((value, index) =>
                            _.keys(item)[index] === "name" ? <Table.Td key={index}><Anchor href={`/admin/project/${value}`} >{value}</Anchor></Table.Td> : <Table.Td key={index}>{
                                value === "true" ?
                                    <MdCheck color="green" /> : value === "false" ?
                                        <MdClose color="red" /> : value === "none" ?
                                            <Badge w={100} color={"gray"}>{value}</Badge> : value === "node" ?
                                                <Badge w={100} color={"orange"}>{value}</Badge> : value === "nextjs" ? <Badge w={100} color={"blue"}>{value}</Badge> : value
                            }</Table.Td>)}
                    </Table.Tr>)}
                </Table.Tbody>
            </Table>
        </Stack>
    </Stack>

}