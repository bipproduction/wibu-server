'use client'
import { Stack, Title } from "@mantine/core";
import ProcessList from "./ProcessList";
import processState from "@/state/process";
import { useSnapshot } from "valtio";
import ProcessDetail from "./ProcessDetail";

function ProcessView() {
  return (
    <Stack>
      <Title order={2}>Process</Title>
      <Container />
    </Stack>
  );
}

function Container() {
  const process = useSnapshot(processState);
  if (!process.selected) return <ProcessList />;
  return <ProcessDetail />;
}

export default ProcessView;
