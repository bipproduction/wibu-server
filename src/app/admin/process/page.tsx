"use client";
import ProcessList from "@/components/process/ProcessList";
import { Divider, Stack, Title } from "@mantine/core";

export default function Page() {
  return (
    <Stack>
      <Title order={2}>Process</Title>
      <Divider />
      <ProcessList />
    </Stack>
  );
}
