/* eslint-disable @typescript-eslint/no-explicit-any */
import serverState from "@/state/server";
import {
  ActionIcon,
  Button,
  Flex,
  Indicator,
  Stack,
  Text,
  Title
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useSnapshot } from "valtio";
import { useProxy } from "valtio/utils";
import ServerAdd from "./ServerAdd";
import ServerUpdate from "./ServerUpdate";

function ServerView() {
  const server = useSnapshot(serverState);

  useShallowEffect(() => {
    serverState.load();
  }, []);
  return (
    <Stack p={"md"}>
      <View name="muku" data={server.muku as any[]} />
      <View name="wibuDev" data={server.wibudev as any[]} />
    </Stack>
  );
}

function View({ name, data }: { name: string; data: any[] | null }) {
  const server = useProxy(serverState);
  if (!data) return <Text>loading ...</Text>;

  if (server.event?.name === name && server.event.action === "add") {
    return <ServerAdd />;
  }

  if (
    server.event?.name === name &&
    server.event.action === "update" &&
    server.updateData
  ) {
    return <ServerUpdate />;
  }

  return (
    <Stack>
      <Stack bg={"dark.9"} p={"xs"}>
        <Flex>
          <Title order={4}>{name}</Title>
        </Flex>
        <Button.Group>
          <Button
            onClick={() => (server.event = { name, action: "add" })}
            variant="light"
            size="compact-xs"
          >
            Add
          </Button>
          <Button
            onClick={() => (server.event = { name, action: "remove" })}
            variant="light"
            size="compact-xs"
          >
            Remove
          </Button>
          <Button
            onClick={() => (server.event = { name, action: "update" })}
            variant="light"
            size="compact-xs"
          >
            Update
          </Button>
        </Button.Group>
      </Stack>
      <Stack>
        {!data?.length && <Text>No servers found</Text>}
        {data.map((item, index) => (
          <Flex key={index} gap={"md"}>
            {server.event?.name === name &&
              server.event?.action === "remove" && (
                <Indicator label={server.deleteCount}>
                  <ActionIcon
                    onClick={() =>
                      server.onRemove({ domainId: name, id: item.id })
                    }
                    c={"red"}
                    variant="transparent"
                  >
                    <IconTrash />
                  </ActionIcon>
                </Indicator>
              )}
            {server.event?.name === name &&
              server.event?.action === "update" && (
                <ActionIcon
                  onClick={() => (server.updateData = item)}
                  variant="transparent"
                >
                  <IconEdit />
                </ActionIcon>
              )}
            <Text w={20}>{index + 1}</Text>
            <Text w={220}>{item.name}</Text>
            <Text>{item.ports.join(",")}</Text>
          </Flex>
        ))}
      </Stack>
    </Stack>
  );
}




export default ServerView;
