'use client'
import { ActionIcon, Anchor, Badge, Box, Button, Card, Code, Flex, Group, List, ListItem, Loader, Modal, NumberInput, Paper, Pill, PinInput, Portal, SegmentedControl, Select, SimpleGrid, Stack, Table, Text, TextInput, Title, Tooltip } from "@mantine/core"
import _ from 'lodash'
import { useState } from "react"
import { TerminalLog } from "./TerminalLog"
import streamFetch from "@/bin/stream_fetch"
import { useInputState, useShallowEffect } from "@mantine/hooks"
import routePath from "@/util/route_path"
import { ProjectBoardView } from "./ProjectBoardView"
import { TableActiveApp } from "./TableActiveApp"
import { UpdateBranchView } from "./UpdateBranchView"
import { NavView } from "./NavView"
import { SegmentView } from "./SegmentView"
import { TableView } from "./TableView"
import { ModalStart } from "./ModalStart"
import { GitTableCommitView } from "./GitTableCommitView"
import { ButtonToogle, DevBox } from "next-dev"


export function TableProjectDetail({ data, title, dbInfo }: { data: any, title: string, dbInfo: any }) {
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

    const onClean = async () => {
        setLoading(true)
        const res = await routePath.bin.project.clean.data({ body: JSON.stringify({ name: title }) })
        console.log(res)
        setLoading(false)
    }

    const DbInfo = () => {

        return <DevBox path="dnNjb2RlOi8vZmlsZS8vVXNlcnMvYmlwL0RvY3VtZW50cy9wcm9qZWN0cy9iaXAvd2lidS1zZXJ2ZXIvc3JjL3VpL3Byb2plY3QvY29tcG9uZW50cy9UYWJsZVByb2plY3REZXRhaWwudHN4Ojg5OjE=">
            <Card withBorder>
                <Stack gap={"xs"}>
                    <Text fw={"bold"}>Db Name</Text>
                    <Text>{dbInfo.data.database}</Text>
                </Stack>
            </Card>
        </DevBox>
    }

    const MainView = () => {
        return <Stack pos={"relative"} w={"100%"}>
            <Title>{title}</Title>

            <ButtonToogle>
                {(isDev) => <Button color={isDev ? "red" : "blue"} >dev</Button>}
            </ButtonToogle>
            <DevBox path="dnNjb2RlOi8vZmlsZS8vVXNlcnMvYmlwL0RvY3VtZW50cy9wcm9qZWN0cy9iaXAvd2lidS1zZXJ2ZXIvc3JjL3VpL3Byb2plY3QvY29tcG9uZW50cy9UYWJsZVByb2plY3REZXRhaWwudHN4OjEwNjox">
                <Flex gap={"xs"}>
                    <ProjectBoardView title={title} />
                    <TableActiveApp title={title} />
                    <DbInfo />
                </Flex>
            </DevBox>
            <UpdateBranchView data={data} onUpdateBranch={onUpdateBranch} selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} />
            <NavView
                onClean={onClean}
                onBuild={onBuild}
                onDbPush={onDbPush}
                onDbSeed={onDbSeed}
                onInstall={onInstall}
                onPull={onPull}
                onStart={onStart}
                data={data}
                title={title} />
            <Box pos={"relative"} style={{
                overflowX: "auto"
            }}>
                {showLog ? <TerminalLog loading={loading} text={textLog} onclose={() => setShowLog(false)} /> : <TableView data={data} />}
            </Box>
            <ModalStart setOpenStart={setOpenStart} setShowLog={setShowLog} setTextLog={setTextLog} textlog={textLog} title={title} opened={openStart} onclose={() => setOpenStart(false)} />
            <SegmentView title={title} data={data} />

        </Stack>
    }

    return <MainView />



}