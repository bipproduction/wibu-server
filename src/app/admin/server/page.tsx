"use client";
import ServerView from "@/components/server/ServerView";
import { Flex, Stack, Title } from "@mantine/core";

export default function Page(){
    return (
        <Stack>
            <Flex gap={"md"} align={"center"}>
                <Title order={2}>Server</Title>
            </Flex>
            <ServerView />
        </Stack>
    )
}
