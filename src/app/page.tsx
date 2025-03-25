/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ConfigView from "@/components/config/ConfigView";
import ProcessView from "@/components/process/ProcessView";
import ServerView from "@/components/server/ServerView";
import {
  Divider,
  Stack,
  Title
} from "@mantine/core";

export default function Home() {
  return (
    <Stack p={"md"}>
      <Title order={2}>API Server</Title>
      {/* <ServerView />
      <Divider />
      <ProcessView />
      <Divider />
      <ConfigView /> */}
    </Stack>
  );
}










