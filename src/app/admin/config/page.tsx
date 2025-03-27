"use client";
import ConfigView from "@/components/config/ConfigView";
import { CloseButton, Stack } from "@mantine/core";
import Link from "next/link";

export default function Page(){
    return (
        <Stack>
            <CloseButton component={Link} href={"/admin"} />
            <ConfigView />
        </Stack>
    )
}