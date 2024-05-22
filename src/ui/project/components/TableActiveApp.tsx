import { Card, Stack, Title, Table, Text } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"
import _ from "lodash"

export const TableActiveApp = ({ title }: { title: string }) => {
    const [activeApp, setActiveApp] = useState<any[]>([])
    useShallowEffect(() => {
        fetch('/api/app/list-project/app', {
            method: "POST",
            body: JSON.stringify({ name: title }),
        }).then(res => res.json()).then(setActiveApp)
    }, [])
    return <Card withBorder>
        <Stack>
            <Text fw={"bold"}>App Status</Text>
            <Table striped highlightOnHover border={1} >
                <Table.Thead>
                    <Table.Tr bg={"black"} c={"white"}>
                        {_.keys(activeApp[0]).map(key => <Table.Th key={key}>{key}</Table.Th>)}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {activeApp.map((target_data, index) => <Table.Tr key={index}>
                        {_.values(target_data).map((value, index) => <Table.Td key={index}>
                            {typeof value === "boolean" ? value.toString() : value}
                        </Table.Td>)}
                    </Table.Tr>)}
                </Table.Tbody>
            </Table>
        </Stack>
    </Card>

}