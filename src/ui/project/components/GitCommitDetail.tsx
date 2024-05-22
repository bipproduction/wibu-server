'use client'
import { CodeHighlight } from "@mantine/code-highlight"
import { Stack, Group, ActionIcon } from "@mantine/core"
import { useRouter } from "next/navigation"
import { MdArrowBackIos, MdCancel } from "react-icons/md"

export const GitCommitDetail = ({ data }: { data: any }) => {
    const router = useRouter()
    return <Stack
        bg={"dark"}
        gap={"md"}
        p={"md"}>
        <ActionIcon onClick={() => router.back()}>
            <MdArrowBackIos />
        </ActionIcon>
        <CodeHighlight
            bg={"dark"}
            c={"white"}
            h={"100vh"} style={{
                overflow: "auto"
            }}
            code={data}
            language="tsx"
            withCopyButton={false}
        />
    </Stack>
}