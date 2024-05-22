'use client'
import routePath from "@/util/route_path"
import { Stack, Group, ActionIcon, Table, Button, Title, Code, Anchor } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import _ from "lodash"
import { useState } from "react"
import { MdArrowBackIos, MdCancel } from "react-icons/md"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { CodeHighlight } from '@mantine/code-highlight'
import { getListGitCommit } from "@/util/router_api"
import { goToCommitDetail } from "@/util/router_page"
import { useRouter } from "next/navigation"

export const GitTableCommitView = ({ title, data }: { title: string, data: any[] }) => {
    // const [dataGitLog, setDataGitLog] = useState<string>("")
    // const [openGitLog, setOpenGitLog] = useState(false)
    const [listGitLog, setListGitLog] = useState<any[] | null>(data)
    const router = useRouter()

    useShallowEffect(() => {
        // loadGitLog()
    }, [])

    const loadGitLog = async () => {
        const res = await getListGitCommit({ name: title })
        setListGitLog(res)

    }




    // subject, committer, date
    const GitLogTableView = () => {
        return <Stack h={"100vh"} style={{
            overflow: "auto"
        }}>
            {/* {JSON.stringify(listGitLog[0])} */}
            <Table highlightOnHover border={1}>
                <Table.Thead bg={"dark"} c={"white"}>
                    <Table.Tr>
                        <Table.Th>#</Table.Th>
                        <Table.Th>subject</Table.Th>
                        <Table.Th>committer</Table.Th>
                        <Table.Th>date</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        listGitLog?.map((item, index) => {
                            return <Table.Tr key={index}>
                                <Table.Td>{index + 1}</Table.Td>
                                <Table.Td>
                                    <Anchor href={goToCommitDetail({ name: title, commit: item.commit })} >{item.subject}</Anchor>
                                </Table.Td>
                                <Table.Td>{item.committer}</Table.Td>
                                <Table.Td>{item.date}</Table.Td>
                                {/* {_.keys(item).map((key, i) => <Table.Td key={i}>
                                    {key === "commit" ? <Button onClick={() => onGitShow(item[key])} w={150} size="compact-xs">{item[key]}</Button> : item[key]}
                                </Table.Td>)} */}
                            </Table.Tr>
                        })
                    }
                </Table.Tbody>
            </Table>
        </Stack>
    }

    return <Stack p={"md"} >
        <Title>{title}</Title>
        <ActionIcon onClick={() => router.back()}>
            <MdArrowBackIos />
        </ActionIcon>
        <GitLogTableView />
    </Stack>
}