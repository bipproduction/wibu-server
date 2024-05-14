'use client'

import { Anchor, Badge, Box, Button, Card, Code, Flex, Group, List, ListItem, Loader, Modal, NumberInput, Paper, Pill, PinInput, Portal, SegmentedControl, Select, SimpleGrid, Stack, Table, Text, TextInput, Title, Tooltip } from "@mantine/core"
import _ from 'lodash'
import { useState } from "react"
import { MdBuild, MdDataSaverOn, MdDataset, MdDownload, MdFolder, MdInstallDesktop, MdKeyboardArrowRight, MdNumbers, MdPlayCircle, MdShare } from "react-icons/md"
import { TerminalLog } from "./TerminalLog"
import streamFetch from "@/bin/stream_fetch"
import { useInputState, useShallowEffect } from "@mantine/hooks"
import toast from "react-simple-toasts"
import { read } from "fs"
import routePath from "@/util/route_path"
import Markdown from "react-markdown"
import moment from "moment"

export function TableProjectDetail({ data, title }: { data: any, title: string }) {
    const [textLog, setTextLog] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [showLog, setShowLog] = useState<boolean>(false)
    const [openStart, setOpenStart] = useState<boolean>(false)
    const [selectedBranch, setSelectedBranch] = useInputState(data.branch)


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

    const onUpdateBranch = async () => {
        setLoading(true)
        setShowLog(true)
        setTextLog("")
        await streamFetch({ url: '/api/bin/project/update-branch', body: { name: title, branch: selectedBranch }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
    }


    const ButtonStudio = () => {
        const [loadingStudio, setLoadingStudio] = useState<boolean>(false)
        const [logText, setLogText] = useState<string>("")
        const [openLog, seTOpenLog] = useState<boolean>(false)

        const onCheckName = async () => {
            // console.log(port)
            setLoadingStudio(true)
            const res: any[] = await fetch('/api/app/list-app/search?name=' + title).then(res => res.json())
            // console.log(res)
            if (res.length === 0) {
                setLoadingStudio(false)
                alert("app belum berjalan , jalankan terlebih dahulu!")
                return
            }
            const result = res.find(item => _.startsWith(item.port, "5"))

            if (result) {
                setLoadingStudio(false)
                // alert(`Already running on ${result.port}`)
                return
            }

            const port = res[0].port.split("")
            port[0] = "5"

            seTOpenLog(true)
            fetch(routePath.bin.studio, {
                method: "POST",
                body: JSON.stringify({ name: title, port: port.join("") }),
            }).then(res => {
                const reader = res.body?.getReader();
                const decoder = new TextDecoder();

                reader?.read().then(function processText({ done, value }): any {
                    if (done) {
                        // console.log("done")
                        // alert("done")
                        return
                    }
                    setLogText(prev => prev + decoder.decode(value))
                    return reader?.read().then(processText)
                })

            })

            setLoadingStudio(false)

        }

        return <Stack>
            <Button loading={loadingStudio} leftSection={<MdInstallDesktop />} size="compact-xs" onClick={onCheckName}>Studio</Button>
            <Portal>
                <Modal size={"lg"} opened={openLog} onClose={() => seTOpenLog(false)}>
                    <Stack>
                        <Code bg={"black"} c={"green"}>
                            <pre style={{
                                backgroundColor: "black",
                                color: "green",
                            }}>{logText}</pre>
                        </Code>
                    </Stack>
                </Modal>
            </Portal>
        </Stack>
    }

    const TableActiveApp = () => {
        const [activeApp, setActiveApp] = useState<any[]>([])
        useShallowEffect(() => {
            fetch('/api/app/list-project/app', {
                method: "POST",
                body: JSON.stringify({ name: title }),
            }).then(res => res.json()).then(setActiveApp)
        }, [])
        return <Card withBorder>
            <Stack>
                <Title order={3}>App Status</Title>
                <Table striped highlightOnHover border={1} >
                    <Table.Thead>
                        <Table.Tr bg={"black"} c={"white"}>
                            {_.keys(activeApp[0]).map(key => <Table.Th key={key}>{key}</Table.Th>)}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {activeApp.map((target_data, index) => <Table.Tr key={index}>
                            {_.values(target_data).map((value, index) => <Table.Td key={index}>
                                {typeof value === "boolean" ? value.toString() : value}
                            </Table.Td>)}
                        </Table.Tr>)}
                    </Table.Tbody>
                </Table>
            </Stack>
        </Card>

    }

    const TableView = () => <Table striped highlightOnHover border={1} >
        <Table.Thead>
            <Table.Tr bg={"black"} c={"white"}>
                {_.keys(_.omit(data, ["readme", "prisma_schema", "env_text"])).map(key => <Table.Th key={key}>{key}</Table.Th>)}
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
            <Table.Tr>
                {_.values(_.omit(data, ["readme", "prisma_schema", "env_text"])).map((value, index) =>
                    <Table.Td key={index}>{_.isArray(value) ? <List icon={<MdShare />} mah={300} style={{
                        overflowY: "auto"
                    }}>
                        {value.map((value, index) => <List.Item key={index}><Tooltip component="button" label={value}>
                            <Text onClick={() => {
                                navigator.clipboard.writeText(value)
                                toast("Copied!")
                            }} style={{
                                cursor: "pointer"
                            }} size={"sm"} lineClamp={1}>{value}</Text></Tooltip></List.Item>)}
                    </List> : typeof value === "object" ? <Table striped highlightOnHover border={1}>
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
            if (!res.available) {
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



    const SegmentView = () => {
        const [segment, setSegment] = useState("Readme")
        const [listGitLog, setListGitLog] = useState<any[]>([])

        useShallowEffect(() => {
            loadGitLog()
        }, [])

        const loadGitLog = async () => {
            const res = await fetch(routePath.bin.project.gitLog.path, {
                body: JSON.stringify({ name: title }),
                method: routePath.bin.project.gitLog.method,
                cache: 'no-store'
            })

            const a = await res.json()
            setListGitLog(a)

        }
        const ReadmeView = () => {
            return <Stack >
                <Title>README</Title>
                <Card bg={"#F8F9FA"} withBorder c={"dark"}>
                    <Markdown>{data.readme}</Markdown>
                </Card>
            </Stack>
        }

        const PrismaSchemaView = () => {

            return <Stack>
                <Title>PRISMA SCHEMA</Title>
                <Code>
                    <pre style={{
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        overflowX: "auto",
                        maxHeight: 500,
                        overflowY: "auto",
                        position: "relative",

                    }}>{data.prisma_schema}</pre>
                </Code>
            </Stack>
        }

        const EnvView = () => {
            return <Stack>
                <Title>ENV</Title>
                <Code>
                    <pre style={{
                        wordWrap: "break-word",
                        whiteSpace: "pre-wrap",
                        overflowX: "auto",
                        maxHeight: 500,
                        overflowY: "auto",
                        position: "relative",

                    }}>{data.env_text}</pre>
                </Code>
            </Stack>
        }

        const GitLogView = () => {

            return <Stack >
                <Title>GIT LOG</Title>
                <Table highlightOnHover border={1}>
                    <Table.Thead bg={"dark"} c={"white"}>
                        <Table.Tr>
                            {_.keys(listGitLog[0]).map((key, i) => <Table.Th key={i}>{key}</Table.Th>)}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            listGitLog.map((item, index) => {
                                return <Table.Tr key={index}>
                                    {_.keys(item).map((key, i) => <Table.Td key={i}>{item[key]}</Table.Td>)}
                                </Table.Tr>
                            })
                        }
                    </Table.Tbody>
                </Table>
            </Stack>
        }

        const list_bottom_view = [
            {
                "name": "Readme",
                "view": ReadmeView
            },
            {
                "name": "Prisma Schema",
                "view": PrismaSchemaView
            },
            {
                "name": "Env",
                "view": EnvView
            },
            {
                "name": "Git Log",
                "view": GitLogView
            }
        ]

        return <Stack  >
            <Group>
                <SegmentedControl title="Segment" color={"blue"} value={segment} data={[...list_bottom_view.map(item => item.name)]} onChange={setSegment} />
            </Group>
            <Card h={"100vh"} style={{
                overflow: "auto"
            }}>
                {list_bottom_view.filter(item => item.name === segment)[0].view()}
            </Card>

        </Stack>
    }

    const UpdateBranchView = () => {
        return <Stack>
            <Group>
                <Card withBorder >
                    <Flex align={"end"} gap={"md"} >
                        <Select
                            value={selectedBranch}
                            variant="filled"
                            label={"select Branch"}
                            placeholder="select branch"
                            data={[...data.remote_branch]}
                            onChange={setSelectedBranch}
                        />
                        <Button onClick={onUpdateBranch} >UPDATE</Button>
                    </Flex>
                </Card>
            </Group>
        </Stack>
    }

    const NavView = () => {

        return <Stack>
            <Button.Group>
                <Button onClick={onPull} leftSection={<MdDownload />} size="compact-xs" w={100}>pull</Button>
                <Button onClick={onInstall} leftSection={<MdInstallDesktop />} size="compact-xs" w={100}>install</Button>
                <Button disabled={data?.prisma === "false"} onClick={onDbPush} leftSection={<MdDataSaverOn />} size="compact-xs" w={100}>db push</Button>
                <Button disabled={data?.seed === "false"} onClick={onDbSeed} leftSection={<MdDataset />} size="compact-xs" w={100}>db seed</Button>
                <Button disabled={data?.type !== "nextjs"} onClick={onBuild} leftSection={<MdBuild />} size="compact-xs" w={100}>build</Button>
                <Button disabled={data?.type === "none"} onClick={onStart} leftSection={<MdPlayCircle />} size="compact-xs" w={100}>start</Button>
                <ButtonStudio />
                {/* <Button disabled={data.prisma === "false"} onClick={onStudio} leftSection={<MdDataset />} size="compact-xs" w={100}>studio</Button> */}
            </Button.Group>
        </Stack>
    }

    const ProjectBoardView = () => {
        const [listProjectBoard, setlistProjectBoard] = useState<any[] | null>(null)
        useShallowEffect(() => {
            loadList()
        }, [])

        const loadList = async () => {
            const res = await fetch(routePath.api.projectBoard.search(title).path, { method: routePath.api.projectBoard.search(title).method }).then(res => res.json())
            setlistProjectBoard(res)
        }
        return <Card withBorder>
            <Stack gap={0}>
                <Title order={3}>Project Board</Title>
                <Flex gap={"md"} >
                    {!listProjectBoard ? <Loader size={"sm"} /> : listProjectBoard.map((itm, i) => <Anchor key={i.toString()} href={routePath.page.projectBoard.byId(itm.id).path}>
                        <Text>{itm.title}</Text>
                    </Anchor>)}
                </Flex>
            </Stack>
        </Card>
    }


    // main view
    return <Stack pos={"relative"} w={"100%"}>
        <Title>{title}</Title>
        <ProjectBoardView />
        <TableActiveApp />
        <UpdateBranchView />
        <NavView />
        <Box pos={"relative"} style={{
            overflowX: "auto"
        }}>
            {showLog ? <TerminalLog loading={loading} text={textLog} onclose={() => setShowLog(false)} /> : <TableView />}
        </Box>
        <ModalStart opened={openStart} onclose={() => setOpenStart(false)} />
        {/* <ButtonStudio /> */}
        <SegmentView />
    </Stack>




}