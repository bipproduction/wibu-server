'use client'

import { Button, Stack, Table } from "@mantine/core"
import _ from "lodash"
import { NavServer } from "./ButtonAddServer"

export function TableServer({ data }: { data: any[] }) {

    const TableView = () => {
        return <Table highlightOnHover border={1}>
            <Table.Thead>
                <Table.Tr bg={"dark"} c={"white"}>
                    {_.keys(data[0]).map(key => <Table.Th key={key}>{key}</Table.Th>)}
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {data.map((target_data, index) => <Table.Tr key={index}>
                    {_.values(target_data).map((value, index) => <Table.Td key={index}>
                        {typeof value === "boolean" ? value.toString() : value}
                    </Table.Td>)}
                </Table.Tr>)}
            </Table.Tbody>
        </Table>
    }

    return <Stack >
        <NavServer listServer={data} />
        <TableView />
    </Stack>
}