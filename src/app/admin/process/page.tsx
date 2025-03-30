"use client";
import ProcessList from "@/components/process/ProcessList";
import { Flex, Stack, Title } from "@mantine/core";

export default function Page() {
  return (
    <Stack>
      <Flex gap={"md"} align={"center"}>
        <Title order={2}>Process</Title>
      </Flex>
      <ProcessList />
    </Stack>
  );
}
