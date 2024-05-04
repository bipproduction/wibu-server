'use client'

import { Anchor, Badge, Button, Center, Loader, Pill, Skeleton, Stack, Table } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"
import _ from 'lodash'
import streamFetch from "@/bin/stream_fetch"
import moment from "moment"

export function TableApp({ data }: { data: any[] }) {
    const [listApp, setlistApp] = useState<any[] | null>(data)
    const [loading, setLoading] = useState<boolean>(false)
    useShallowEffect(() => {
        loadListApp()
    }, [])

    const loadListApp = async () => {
        const res = await fetch('/api/app/list-app').then(res => res.json())
        setlistApp(res)
    }

    if (!listApp) return <Center p={"lg"}><Loader /></Center>
    return <Stack>
        <Table striped highlightOnHover border={1}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>#</Table.Th>
                    {_.keys(listApp![0]).map(key => <Table.Th key={key}>{key}</Table.Th>)}
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
                                    _.keys(item)[index] === "memory" ? <Pill>{+value / (1024 * 1024)} MB</Pill> :
                                        _.keys(item)[index] === "memory" ? moment(value).format("YYYY-MM-DD HH:mm:ss") : value}
                            </Table.Td>)}
                    </Table.Tr>)}
            </Table.Tbody>
        </Table>
    </Stack>
}