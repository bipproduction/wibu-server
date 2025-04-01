"use client";
import ServerView from "@/components/server/ServerView";
import serverState from "@/state/server";
import { ActionIcon, Flex, Stack, Title, Loader } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";

export default function Page(){
    const server = useProxy(serverState);
    return (
        <Stack>
            <Flex gap={"md"} align={"center"}>
                <Title order={2}>Server</Title>
                <ActionIcon display={server.load.loading ? "none" : "block"} variant="transparent" onClick={() => {
                    server.load.load();
                }}>
                    <IconRefresh />
                </ActionIcon>
                <Loader display={server.load.loading ? "block" : "none"} size={"sm"} />
            </Flex>
            <ServerView />
        </Stack>
    )
}
