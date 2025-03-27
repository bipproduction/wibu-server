"use client";
import ServerView from "@/components/server/ServerView";
import { CloseButton, Stack } from "@mantine/core";
import Link from "next/link";

export default function Page(){
    return (
        <Stack>
            <CloseButton component={Link} href={"/admin"} />
            <ServerView />
        </Stack>
    )
}
