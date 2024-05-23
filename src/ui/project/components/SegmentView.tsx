'use client'
import routePath from "@/util/route_path"
import { Stack, Title, Card, Code, Group, ActionIcon, Table, Button, SegmentedControl } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import _ from "lodash"
import { useState } from "react"
import { MdCancel } from "react-icons/md"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export const SegmentView = ({ title, data }: { title: string, data: any }) => {
    const [segment, setSegment] = useState("Readme")
    
    const ReadmeView = () => {
        return <Stack >
            <Title>README</Title>
            <Card bg={"#F8F9FA"} withBorder c={"dark"}>
                <Markdown remarkPlugins={[remarkGfm]}>{data.readme}</Markdown>
            </Card>
        </Stack>
    }

    const PrismaSchemaView = () => {

        return <Stack>
            <Title>PRISMA SCHEMA</Title>
            <Code>
                <pre style={{
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                    overflowX: "auto",
                    maxHeight: 500,
                    overflowY: "auto",
                    position: "relative",

                }}>{data.prisma_schema}</pre>
            </Code>
        </Stack>
    }

    // const EnvView = () => {
    //     return <Stack>
    //         <Title>ENV</Title>
    //         <Code>
    //             <pre style={{
    //                 wordWrap: "break-word",
    //                 whiteSpace: "pre-wrap",
    //                 overflowX: "auto",
    //                 maxHeight: 500,
    //                 overflowY: "auto",
    //                 position: "relative",

    //             }}>{data.env_text}</pre>
    //         </Code>
    //     </Stack>
    // }

    

    const list_bottom_view = [
        {
            "name": "Readme",
            "view": ReadmeView
        },
        {
            "name": "Prisma Schema",
            "view": PrismaSchemaView
        },
        // {
        //     "name": "Env",
        //     "view": EnvView
        // },
       
    ]

    return <Stack  >
        <Group>
            <SegmentedControl title="Segment" color={"blue"} value={segment} data={[...list_bottom_view.map(item => item.name)]} onChange={setSegment} />
        </Group>
        <Card h={"100vh"} style={{
            overflow: "auto"
        }}>
            {list_bottom_view.filter(item => item.name === segment)[0].view()}
        </Card>

    </Stack>
}