"use client";
import ProcessView from "@/components/process/ProcessView";
import { CloseButton, Flex, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function Page() {
  return (
    <Stack>
      <Flex gap={"md"} align={"center"}>
        <CloseButton size={"xl"} component={Link} href={"/admin"} />
        <Title order={2}>Process</Title>
      </Flex>
      <ProcessView />
    </Stack>
  );
}
