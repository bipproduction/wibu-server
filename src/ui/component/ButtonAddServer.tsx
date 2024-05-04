'use client'
import { Button, Code, Dialog, Modal, Notification, PinInput, Portal, Stack, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import toasts from "react-simple-toasts"


const text_template = ({ name, port, server }: { name: string, port: string, server: string }) => `
server {
    server_name ${name}.${server};

    location / {
        proxy_pass http://localhost:${port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

}
`

export function NavServer({ listServer }: { listServer: any[] }) {
    const [openDialog, setOpendialog] = useState(false)
    const [resultText, setResultText] = useState("")
    const ModalCreateServer = () => {
        const [loading, setLoading] = useState(false)
        const [errorText, setErrorText] = useState("")
        const [dataText, setDataText] = useState({
            name: "",
            server: "",
            port: "",
        })

        const onSubmit = async () => {
            setLoading(true)
            if (dataText.name === "" || dataText.server === "" || dataText.port === "") {
                setErrorText("Please fill all fields")
                setLoading(false)
                return
            }

            const checkPort = listServer.find(server => +server.port === +dataText.port)
            if (checkPort) {
                setErrorText("port already in use")
                setLoading(false)
                return
            }

            const template = text_template(dataText)
            setResultText(template)

            await navigator.clipboard.writeText(template);
            toasts("Copied to clipboard")

            setLoading(false)
        }

        return <Modal title="Add Server" opened={openDialog} onClose={() => setOpendialog(false)}>
            <Stack>
                {errorText !== "" && <Notification color="red" onClose={() => setErrorText("")} bg={"orange"} icon={<MdClose />} ><Text c={"white"}>{errorText}</Text></Notification>}
                <TextInput label="Name" placeholder="Example" onChange={(e) => setDataText({ ...dataText, name: e.target.value })} />
                <TextInput label="Server Name" placeholder="wibudev.com" onChange={(e) => setDataText({ ...dataText, server: e.target.value })} />
                <Text>PORT</Text>
                <PinInput type={"number"} title="port" placeholder="0" length={4} value={dataText.port} onChange={(e) => setDataText({ ...dataText, port: e })} />
                <Button onClick={onSubmit} loading={loading}>Submit</Button>
                {resultText !== "" && <Code><pre>{resultText}</pre></Code>}
            </Stack>
        </Modal>
    }
    return <Stack>
        <Portal >
            <ModalCreateServer />
        </Portal>
        <Button.Group>
            <Button onClick={() => setOpendialog(true)} w={100} leftSection={<MdAdd />} size="compact-xs">Add </Button>
        </Button.Group>

    </Stack>
}