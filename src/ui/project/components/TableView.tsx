import { Table, List, Tooltip, Flex, Pill, Box, Text } from "@mantine/core"
import _ from "lodash"
import { MdShare } from "react-icons/md"
import toast from "react-simple-toasts"

export const TableView = ({data}: {data: any}) => <Table striped highlightOnHover border={1} >
<Table.Thead>
    <Table.Tr bg={"black"} c={"white"}>
        {_.keys(_.omit(data, ["readme", "prisma_schema", "env_text"])).map(key => <Table.Th key={key}>{key}</Table.Th>)}
    </Table.Tr>
</Table.Thead>
<Table.Tbody>
    <Table.Tr>
        {_.values(_.omit(data, ["readme", "prisma_schema", "env_text"])).map((value, index) =>
            <Table.Td key={index}>{_.isArray(value) ? <List icon={<MdShare />} mah={300} style={{
                overflowY: "auto"
            }}>
                {value.map((value, index) => <List.Item key={index}><Tooltip component="button" label={value}>
                    <Text onClick={() => {
                        navigator.clipboard.writeText(value)
                        toast("Copied!")
                    }} style={{
                        cursor: "pointer"
                    }} size={"sm"} lineClamp={1}>{value}</Text></Tooltip></List.Item>)}
            </List> : typeof value === "object" ? <Table striped highlightOnHover border={1}>
                <Table.Thead>
                    <Table.Tr bg={"gray"}>
                        {_.keys(value).map(key => <Table.Th key={key}>{key}</Table.Th>)}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        {_.values(value).map((value, index) => <Table.Td key={index}>{typeof value === "object" ?
                            <Flex wrap={"wrap"} gap={"sm"} mah={200} pos={"relative"} style={{
                                overflowX: "auto"
                            }}>
                                {_.keys(value).map(key => <Pill key={key}>{key + " : " + value[key]}</Pill>)}
                            </Flex> : <Box >
                                {value}
                            </Box>}</Table.Td>)}
                    </Table.Tr>
                </Table.Tbody>
            </Table> : <Box style={{
                maxHeight: 200,
                overflowY: "auto"
            }}>{value}</Box>}</Table.Td>
        )}
    </Table.Tr>
</Table.Tbody>
</Table>