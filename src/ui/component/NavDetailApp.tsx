'use client'
import { Button, Group, Modal, Portal, Stack } from "@mantine/core";
import { useState } from "react";
import { MdDelete, MdFileOpen, MdRestartAlt, MdStop } from "react-icons/md";
import ButtonAppLog from "./ButtonAppLog";

export function NavDetailApp({ name, status, onRestart, onStop, onDelete, loading }: { name: string, status: string, onRestart: () => void, onStop: () => void, onDelete: () => void, loading?: boolean }) {


    return <Stack>
        <Button.Group>
            <Button w={100} loading={loading} onClick={onRestart} leftSection={<MdRestartAlt />} size="compact-xs">restart</Button>
            <Button disabled={status !== "online"} w={100} loading={loading} onClick={onStop} leftSection={<MdStop />} size="compact-xs">stop</Button>
            <Button disabled={status === "online"} w={100} loading={loading} onClick={onDelete} leftSection={<MdDelete />} size="compact-xs">delete</Button>
            {/* <Button w={100} loading={loading} onClick={() => { }} leftSection={<MdFileOpen />} size="compact-xs">log</Button> */}
        </Button.Group>
        <ButtonAppLog name={name} />
    </Stack>
}