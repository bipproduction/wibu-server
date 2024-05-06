'use client'

import { Badge, Box, Button, Code, Flex, Group, Modal, NumberInput, Pill, PinInput, Stack, Table, Text, TextInput, Title, Tooltip } from "@mantine/core"
import _ from 'lodash'
import { useState } from "react"
import { MdBuild, MdDataSaverOn, MdDataset, MdDownload, MdInstallDesktop, MdNumbers, MdPlayCircle } from "react-icons/md"
import { TerminalLog } from "./TerminalLog"
import streamFetch from "@/bin/stream_fetch"
import { useInputState } from "@mantine/hooks"

export function TableProjectDetail({ data, title }: { data: any, title: string }) {
    const [textLog, setTextLog] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [showLog, setShowLog] = useState<boolean>(false)
    const [openStart, setOpenStart] = useState<boolean>(false)

    const onPull = async () => {
        setLoading(true)
        setShowLog(true)
        setTextLog("")
        await streamFetch({ url: '/api/bin/project/pull', body: { name: title, branch: data.branch }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
    }

    const onInstall = async () => {
        setLoading(true)
        setShowLog(true)
        setTextLog("")
        await streamFetch({ url: '/api/bin/project/install', body: { name: title }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
    }

    const onDbPush = async () => {
        setLoading(true)
        setShowLog(true)
        setTextLog("")
        await streamFetch({ url: '/api/bin/project/db-push', body: { name: title }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
    }

    const onDbSeed = async () => {
        setLoading(true)
        setShowLog(true)
        setTextLog("")
        await streamFetch({ url: '/api/bin/project/seed', body: { name: title }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
    }

    const onBuild = async () => {
        setLoading(true)
        setShowLog(true)
        setTextLog("")
        await streamFetch({ url: '/api/bin/project/build', body: { name: title }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
    }

    const onStart = () => {
        setOpenStart(true)

    }

    const TableView = () => <Table striped highlightOnHover border={1} >
        <Table.Thead>
            <Table.Tr bg={"black"} c={"white"}>
                {_.keys(_.omit(data, "readme")).map(key => <Table.Th key={key}>{key}</Table.Th>)}
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                {_.values(_.omit(data, "readme")).map((value, index) =>
                    <Table.Td key={index}>{_.isArray(value) ? <Flex wrap={"wrap"} gap={"sm"}>
                        {value.map((value, index) => <Tooltip label={value} key={index}>
                            <Pill w={100} >{value}</Pill>
                        </Tooltip>)}
                    </Flex> : typeof value === "object" ? <Table striped highlightOnHover border={1}>
                        <Table.Thead>
                            <Table.Tr bg={"gray"}>
                                {_.keys(value).map(key => <Table.Th key={key}>{key}</Table.Th>)}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                {_.values(value).map((value, index) => <Table.Td key={index}>{typeof value === "object" ?
                                    <Flex wrap={"wrap"} gap={"sm"} mah={200} pos={"relative"} style={{
                                        overflowX: "auto"
                                    }}>
                                        {_.keys(value).map(key => <Pill key={key}>{key + " : " + value[key]}</Pill>)}
                                    </Flex> : <Box >
                                        {value}
                                    </Box>}</Table.Td>)}
                            </Table.Tr>
                        </Table.Tbody>
                    </Table> : <Box style={{
                        maxHeight: 200,
                        overflowY: "auto"
                    }}>{value}</Box>}</Table.Td>
                )}
            </Table.Tr>
        </Table.Tbody>
    </Table>



    const ModalStart = function ({ opened, onclose }: { opened: boolean, onclose: () => void }) {
        const [port, setPort] = useInputState<number>(3000)
        const [loading, setLoading] = useState(false)
        const [errorText, setErrorText] = useState("")
        const onSubmit = async () => {
            setLoading(true)

            const res = await fetch('/api/app/list-app/port-available?port=' + port).then(res => res.json())
            if (res.available) {
                setLoading(false)
                setErrorText("port already in use")
                return
            }
            setShowLog(true)
            setOpenStart(false)
            await streamFetch({ url: '/api/bin/project/start', body: { name: title, port: port }, onTextLog: (text) => setTextLog(prev => prev + text) })
            setLoading(false)
        }
        return <Modal opened={opened} onClose={onclose} withCloseButton withOverlay>
            <Stack>
                <Title order={3}>START SERVER</Title>
                <Title order={5}>PORT</Title>
                <PinInput title="port" placeholder="port" length={4} value={port + ""} onChange={setPort as any} />
                <Text c={"red"}>{errorText}</Text>
                <Group gap={"md"} justify="end">
                    <Button radius={"xl"} w={100} size="compact-xs" onClick={onclose} bg={"red"}>cancel</Button>
                    <Button loading={loading} radius={"xl"} w={100} size="compact-xs" onClick={onSubmit} bg={"blue"}>start</Button>
                </Group>
            </Stack>
        </Modal>
    }

    return <Stack pos={"relative"} w={"100%"}>
        <Title>{title}</Title>
        <Button.Group>
            <Button onClick={onPull} leftSection={<MdDownload />} size="compact-xs" w={100}>pull</Button>
            <Button onClick={onInstall} leftSection={<MdInstallDesktop />} size="compact-xs" w={100}>install</Button>
            <Button onClick={onDbPush} leftSection={<MdDataSaverOn />} size="compact-xs" w={100}>db push</Button>
            <Button onClick={onDbSeed} leftSection={<MdDataset />} size="compact-xs" w={100}>db seed</Button>
            <Button disabled={data?.type !== "nextjs"} onClick={onBuild} leftSection={<MdBuild />} size="compact-xs" w={100}>build</Button>
            <Button disabled={data?.type === "none"} onClick={onStart} leftSection={<MdPlayCircle />} size="compact-xs" w={100}>start</Button>
        </Button.Group>
        <Box pos={"relative"} style={{
            overflowX: "auto"
        }}>
            {showLog ? <TerminalLog loading={loading} text={textLog} onclose={() => setShowLog(false)} /> : <TableView />}
        </Box>
        <ModalStart opened={openStart} onclose={() => setOpenStart(false)} />
        <Title>README</Title>
        <Code>
            <pre style={{
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                overflowX: "auto",
                maxHeight: 500,
                overflowY: "auto",
                position: "relative",

            }}>{data.readme}</pre>
        </Code>
    </Stack>


}