"use client";
import ServerView from "@/components/server/ServerView";
import { CloseButton, Stack } from "@mantine/core";
import { Flex, Title } from "@mantine/core";
import Link from "next/link";

export default function Page(){
    return (
        <Stack>
            <Flex gap={"md"} align={"center"}>
                <CloseButton size={"xl"} component={Link} href={"/admin"} />
                <Title order={2}>Server</Title>
            </Flex>
            <ServerView />
        </Stack>
    )
}
