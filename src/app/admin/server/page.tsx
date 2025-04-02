"use client";
import ServerView from "@/components/server/ServerView";
import serverState from "@/state/server";
import { ActionIcon, Box, Flex, Loader, Stack, Text, Tooltip } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";

export default function Page() {
  const server = useProxy(serverState);
  return (
    <Stack>
      <Flex gap={"md"} align={"center"}>
        <Box p={"md"}>
        <Text size="2rem">Server</Text>
        </Box>
        <ActionIcon
          display={server.load.loading ? "none" : "block"}
          variant="transparent"
          onClick={() => {
            server.load.load();
          }}
        >
          <Tooltip label="Reload" position="bottom">
            <IconRefresh />
          </Tooltip>
        </ActionIcon>
        <Loader display={server.load.loading ? "block" : "none"} size={"sm"} />
      </Flex>
      <ServerView />
    </Stack>
  );
}
