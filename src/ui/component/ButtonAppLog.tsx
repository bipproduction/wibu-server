import { Button, Code, Loader, Modal, Portal, Stack } from "@mantine/core";
import { useState } from "react";
import { MdFileOpen, MdHistory } from "react-icons/md";

export function ButtonAppLog({ name }: { name: string }) {
    const [openLog, setOpenLog] = useState(false)
    const [logText, setLogText] = useState("")
    const [loading, setLoading] = useState(false)

    const onLog = async () => {
        setOpenLog(true)
        setLoading(true)
        let log = ""
        fetch('/api/bin/app/log', { method: 'POST', cache: 'no-cache', body: JSON.stringify({ name }) })
            .then(res => {
                const reader = res.body?.getReader();
                const decoder = new TextDecoder();

                reader?.read().then(function processText({ done, value }): any {
                    if (done) {
                        setLoading(false)
                        return
                    }
                    setLogText(prev => prev + decoder.decode(value))
                    log = log + decoder.decode(value)
                    return reader?.read().then(processText)
                })
            })
    }

    return (
        <Stack>
            <Button.Group>
                <Button onClick={onLog} size="compact-xs" leftSection={<MdFileOpen />}>log</Button>
            </Button.Group>
            <Portal>
                <Modal title={"App Log"} size={"lg"} opened={openLog} onClose={() => setOpenLog(false)} >
                    <Stack>
                        <Code bg={"black"} c={"green"} h={500} style={{
                            overflow: "auto"
                        }}>
                            <Loader size={16} display={loading ? "block" : "none"} />
                            <pre style={{
                                backgroundColor: "black",
                                color: "green",
                            }}>{logText}</pre>
                        </Code>
                    </Stack>
                </Modal>
            </Portal>
        </Stack>
    )
}