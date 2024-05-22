'use client'
import { Box, Flex, Paper, Stack, Table, Text, Title } from "@mantine/core";
import _ from 'lodash'
import { NavDetailApp } from "./NavDetailApp";
import { useState } from "react";
import { TerminalLog } from "../project/components/TerminalLog";
import { useShallowEffect } from "@mantine/hooks";
import streamFetch from "@/bin/stream_fetch";

export function TableAppDetail({ data, title }: { data: { [key: string]: any | null }, title: string }) {
    const [loading, setLoading] = useState<boolean>(false)
    const [appData, setAppData] = useState<{ [key: string]: any } | null>(data)
    const [showLog, setShowLog] = useState<boolean>(false)
    const [textLog, setTextLog] = useState<string>("")

    const loadData = async () => {
        const res = await fetch('/api/app/list-app/' + title, { method: 'GET', cache: 'no-cache' }).then(res => res.json())
        setAppData(res)
    }

    useShallowEffect(() => {
        loadData()
    }, [])

    if (!data) return <Title>App {title} not found</Title>

    const DisplayTable = ({ target_data }: { target_data: { [key: string]: any } | null }) => {
        return <Table highlightOnHover border={1}>
            <Table.Thead>
                <Table.Tr bg={"dark"} c={"white"}>
                    {_.keys(target_data).map(key => <Table.Th key={key}>{key}</Table.Th>)}
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Table.Tr>
                    {_.values(target_data).map((value, index) => <Table.Td key={index}>
                        {typeof value === "object" ? <Box pos={"relative"} style={{
                            overflowX: "auto"
                        }}>
                            <DisplayTable target_data={value} />
                        </Box> :
                            <Box pos={"relative"} >
                                <Text>{value}</Text>
                            </Box>}
                    </Table.Td>)}
                </Table.Tr>
            </Table.Tbody>
        </Table>
    }

    const onRestart = async () => {
        setTextLog("")
        setShowLog(true)
        setLoading(true)
        await streamFetch({ url: "/api/bin/app/restart", body: { name: title }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
        loadData()
    }

    const onStop = async () => {
        setTextLog("")
        setShowLog(true)
        setLoading(true)
        await streamFetch({ url: "/api/bin/app/stop", body: { name: title }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
        loadData()
    }

    const onDelete = async () => {
        setTextLog("")
        setShowLog(true)
        setLoading(true)
        await streamFetch({ url: "/api/bin/app/delete", body: { name: title }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
        window.location.href = '/admin/app'
    }


    return <Stack pos={"relative"} style={{
        overflow: "auto"
    }}>
        <Title order={3}>{title}</Title>
        <NavDetailApp name={title} status={appData?.status} onRestart={onRestart} onStop={onStop} onDelete={onDelete} loading={loading} />
        {showLog ? <TerminalLog loading={loading} text={textLog} onclose={() => setShowLog(false)} /> : <DisplayTable target_data={appData} />}
    </Stack>
}