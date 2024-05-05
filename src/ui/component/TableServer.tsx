'use client'

import { ActionIcon, Button, Flex, Paper, Stack, Table, TextInput } from "@mantine/core"
import _ from "lodash"
import { NavServer } from "./ButtonAddServer"
import { MdRestartAlt, MdSearch } from "react-icons/md"
import { useState } from "react"
import { useShallowEffect } from "@mantine/hooks"

export function TableServer({ data }: { data: any[] }) {
    const [listData, setListData] = useState<any[]>(data)
    const [listDataClone, setListDataClone] = useState<any[]>(data)
    const [loading, setLoading] = useState<boolean>(false)

    useShallowEffect(() => {
        onLoadData()
    }, [])

    const onSearch = (text: string) => {
        const listSearch = listDataClone!.filter(item => _.values(item)[0].toLowerCase().includes(text.toLowerCase()))
        setListData(listSearch)
    }

    const onLoadData = async () => {
        setLoading(true)
        const res = await fetch('/api/app/list-server', { cache: "no-store" }).then(res => res.json())
        setListData(res)
        setListDataClone(res)
        setLoading(false)
    }


    return <Stack >
        <NavServer listServer={listData} />
        <Stack>
            <Flex justify={"flex-end"} gap={"md"} >
                <TextInput placeholder="Search" leftSection={<MdSearch />} onChange={(e) => onSearch(e.target.value)} />
                <ActionIcon onClick={onLoadData} loading={loading}>
                    <MdRestartAlt />
                </ActionIcon>
            </Flex>
            <Table highlightOnHover border={1}>
                <Table.Thead>
                    <Table.Tr bg={"dark"} c={"white"}>
                        {_.keys(listData[0]).map(key => <Table.Th key={key}>{key}</Table.Th>)}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {listData.map((target_data, index) => <Table.Tr key={index}>
                        {_.values(target_data).map((value, index) => <Table.Td key={index}>
                            {typeof value === "boolean" ? value.toString() : value}
                        </Table.Td>)}
                    </Table.Tr>)}
                </Table.Tbody>
            </Table>
           
        </Stack>
    </Stack>
}