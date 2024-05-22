'use client'
import streamFetch from "@/bin/stream_fetch";
import { eventLoadProject } from "@/util/event";
import { Button, Group, Modal, Paper, Stack, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { MdAdd, MdNearMe, MdShare, MdTextFormat } from "react-icons/md";
import { TerminalLog } from "../project/components/TerminalLog";

export function NavProject() {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [textLog, setTextLog] = useState("")
    const [openTerminal, setOpenTerminal] = useState(false)
    const [textForm, setTextForm] = useState({
        url: "",
        name: ""
    })

    const onSubmit = async () => {

        if (textForm.url === "") return alert("please fill git url")
        if (textForm.name.includes(" ")) return alert("name cannot contain space")

        setTextLog("")
        setLoading(true)
        setOpenTerminal(true)
        await streamFetch({ url: '/api/bin/project/add', body: { ...textForm }, onTextLog: (text) => setTextLog(prev => prev + text) })
        setLoading(false)
        eventLoadProject.emit("load")
    }


    return <Stack>
        <Button.Group>
            <Button onClick={() => setOpenModal(true)} size="compact-xs" leftSection={<MdAdd />} >Add Project</Button>
        </Button.Group>
        <Modal opened={openModal} onClose={() => setOpenModal(false)} title="Add Project" size="lg">
            <Stack>
                <Stack gap={"md"} >
                    <TextInput leftSection={<MdShare />} placeholder="https://github.com/bipproduction/...." label="Git Url" onChange={(e) => setTextForm(prev => ({ ...prev, url: e.target.value }))} />
                    <TextInput description={"optional | bisa dilosongkan"} leftSection={<MdTextFormat />} placeholder="sample-app." label="Custom Name" onChange={(e) => setTextForm(prev => ({ ...prev, name: e.target.value }))} />
                    <Group justify="end">
                        <Button loading={loading} onClick={onSubmit} size="compact-xs">Submit</Button>
                        <Button onClick={() => setOpenModal(false)} size="compact-xs" variant="outline">Cancel</Button>
                    </Group>
                </Stack>
                <TerminalLog text={textLog} loading={loading} onclose={() => setOpenTerminal(false)} />
            </Stack>
        </Modal>
    </Stack>
}