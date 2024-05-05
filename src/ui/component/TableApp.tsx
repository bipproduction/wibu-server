'use client'

import { ActionIcon, Anchor, Badge, Button, Center, Flex, Loader, Pill, Skeleton, Stack, Table, TextInput } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"
import _ from 'lodash'
import streamFetch from "@/bin/stream_fetch"
import moment from "moment"
import { MdRestartAlt, MdSearch } from "react-icons/md"

export function TableApp({ data }: { data: any[] }) {
    const [listApp, setlistApp] = useState<any[] | null>(data)
    const [listAppClone, setlistAppClone] = useState<any[] | null>(data)
    const [loading, setLoading] = useState<boolean>(false)
    useShallowEffect(() => {
        loadListApp()
    }, [])

    const loadListApp = async () => {
        const res = await fetch('/api/app/list-app', { cache: "no-store" }).then(res => res.json())
        setlistApp(res)
        setlistAppClone(res)
    }

    const onSearch = async (text: string) => {
        const listSearch = listAppClone!.filter(item => _.values(item)[0].toLowerCase().includes(text.toLowerCase()))
        setlistApp(listSearch)
    }

    if (!listApp) return <Center p={"lg"}><Loader /></Center>
    return <Stack >
        <Flex justify={"end"} gap={"md"} p={"sm"}>
            <TextInput size="xs" leftSection={<MdSearch />} placeholder="search" onChange={(e) => onSearch(e.target.value)} />
            <ActionIcon onClick={loadListApp}>
                <MdRestartAlt />
            </ActionIcon>
        </Flex>
        <Stack style={{
            overflowX: "auto",
            width: "100%",
            position: "relative"
        }}>
            <Table striped highlightOnHover border={1} >
                <Table.Thead>
                    <Table.Tr >
                        <Table.Th pos={"sticky"} left={0} bg={"dark"} c={"white"}>#</Table.Th>
                        {_.keys(listApp![0]).map(key => <Table.Th pos={"sticky"} left={0} bg={"dark"} c={"white"} key={key}>{key}</Table.Th>)}
                        {/* <Table.Th>action</Table.Th> */}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {listApp?.map((item, index) =>
                        <Table.Tr key={index}>
                            <Table.Td>{index + 1}</Table.Td>
                            {_.values(item).map((value, index) =>
                                <Table.Td key={index}>{_.keys(item)[index] === "name" ?
                                    <Anchor href={`/admin/app/${value}`} >{value}</Anchor> :
                                    _.keys(item)[index] === "status" ? <Badge w={100} bg={value === "online" ? "green" : value === "stopped" ? "orange" : "red"}>{value}</Badge> :
                                        _.keys(item)[index] === "memory" ? <Pill>{Math.round((+value / (1024 * 1024)))} MB</Pill> :
                                            _.keys(item)[index] === "created_at" ? moment(value).format("YYYY-MM-DD HH:mm:ss") : value}
                                </Table.Td>)}
                        </Table.Tr>)}
                </Table.Tbody>
            </Table>
        </Stack>
    </Stack>
}