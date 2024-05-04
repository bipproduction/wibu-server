'use client'
import { Button } from "@mantine/core";
import { MdDelete, MdRestartAlt, MdStop } from "react-icons/md";

export function NavDetailApp({ status, onRestart, onStop, onDelete, loading }: { status: string, onRestart: () => void, onStop: () => void, onDelete: () => void, loading?: boolean }) {
    return <Button.Group>
        <Button w={100} loading={loading} onClick={onRestart} leftSection={<MdRestartAlt />} size="compact-xs">restart</Button>
        <Button disabled={status !== "online"} w={100} loading={loading} onClick={onStop} leftSection={<MdStop />} size="compact-xs">stop</Button>
        <Button disabled={status === "online"} w={100} loading={loading} onClick={onDelete} leftSection={<MdDelete />} size="compact-xs">delete</Button>
    </Button.Group>
}