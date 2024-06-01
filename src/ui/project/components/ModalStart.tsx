'use client'
import streamFetch from "@/bin/stream_fetch"
import { Modal, Stack, Title, PinInput, Group, Button, Text } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import _ from "lodash"
import { useState } from "react"

export const ModalStart = function ({ opened, onclose, title, textlog, setTextLog, setShowLog, setOpenStart  }: { opened: boolean, onclose: () => void, title: string, textlog: string, setTextLog: (text: string) => void, setShowLog: (show: boolean) => void, setOpenStart: (open: boolean) => void }) {
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
        await streamFetch({ url: '/api/bin/project/start', body: { name: title, port: port }, onTextLog: (text) => {
            // setTextLog(prev => prev + text)
            let t = _.clone(textlog)
            t = t + text
            setTextLog(t)

        } })
        setLoading(false)
    }
    return <Modal opened={opened} onClose={onclose} withCloseButton withOverlay >
        <Stack>
            <Title order={3}>START SERVER</Title>
            <Title order={5}>PORT</Title>
            <PinInput title="port" placeholder="port" length={4} value={port + ""} onChange={setPort as any} />
            <Text c={"red"}>{errorText}</Text>
            <Group gap={"md"} justify="end">
                <Button variant="" radius={"xl"} w={100} size="compact-xs" onClick={onclose} bg={"red"}>cancel</Button>
                <Button loading={loading} radius={"xl"} w={100} size="compact-xs" onClick={onSubmit} bg={"blue"}>start</Button>
            </Group>
        </Stack>
    </Modal>
}