import { Stack, Group, Card, Flex, Select, Button } from "@mantine/core"
export const UpdateBranchView = ({ data, onUpdateBranch, selectedBranch, setSelectedBranch }:
    {
        data: any,
        onUpdateBranch: () => void,
        selectedBranch: string,
        setSelectedBranch: (value: string | null) => void
    }) => {
    return <Stack>
        <Group>
            <Card withBorder >
                <Flex align={"end"} gap={"md"} >
                    <Select
                        value={selectedBranch}
                        variant="filled"
                        label={"select Branch"}
                        placeholder="select branch"
                        data={[...data.remote_branch]}
                        onChange={setSelectedBranch}
                    />
                    <Button onClick={onUpdateBranch} >UPDATE</Button>
                </Flex>
            </Card>
        </Group>
    </Stack>
}