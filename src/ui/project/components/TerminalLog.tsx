import { ActionIcon, Code, Flex, Loader, Stack, Text } from "@mantine/core";
import { MdClose } from "react-icons/md";
import stripAnsi from 'strip-ansi';

export function TerminalLog({ text, loading, onclose }: { text: string, loading: boolean, onclose?: () => void }) {

    const TerminalViewV1 = () => {
        return <Stack bg={"dark"} h={500} gap={0} pos={"relative"} style={{
            overflowY: "auto"
        }}>
            <Flex justify={"space-between"} p={"xs"} bg={"black"} align={"center"}>
                <Flex gap={"xl"} align={"center"} >
                    {loading && <Loader size={16} />}
                    <Text c={"white"}>Terminal Log</Text>
                </Flex>
                <ActionIcon onClick={onclose}>
                    <MdClose />
                </ActionIcon>
            </Flex>
            <Code p={"xs"} bg={"dark"} c={"green"}>
                <pre>{stripAnsi(text)}</pre>
            </Code>
        </Stack>
    }


    
    return <TerminalViewV1 />
}