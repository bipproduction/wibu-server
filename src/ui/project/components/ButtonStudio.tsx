import routePath from "@/util/route_path"
import { Stack, Button, Portal, Modal, Code } from "@mantine/core"
import _ from "lodash"
import { useState } from "react"
import { MdInstallDesktop } from "react-icons/md"

export const ButtonStudio = ({title}: {title: string}) => {
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