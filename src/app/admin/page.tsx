'use client'
import { Card, Flex, Stack, Text } from "@mantine/core";

export default function Page(){
    return <Stack>
       <Card>
        <Flex gap={"md"} align={"center"}>
            <Text size="1.5rem">Admin</Text>

        </Flex>
       </Card>
    </Stack>
}