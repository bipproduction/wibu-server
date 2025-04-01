/* eslint-disable @typescript-eslint/no-explicit-any */
import serverState from "@/state/server";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Flex,
  Stack,
  Table,
  Text,
  Title,
  Tooltip
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconEdit, IconPlus, IconReload, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { useProxy } from "valtio/utils";
import ServerAdd from "./ServerAdd";
import ServerUpdate from "./ServerUpdate";

function ServerView() {
  const server = useSnapshot(serverState);

  useShallowEffect(() => {
    serverState.load.load();
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
  const [deleteCount, setDeleteCount] = useState(0);
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
            <Tooltip label="Add">
              <IconPlus />
            </Tooltip>
          </Button>
          <Button
            onClick={() => (server.event = { name, action: "remove" })}
            variant="light"
            size="compact-xs"
          >
            <Tooltip label="Remove">
              <IconTrash />
            </Tooltip>
          </Button>
          <Button
            onClick={() => (server.event = { name, action: "update" })}
            variant="light"
            size="compact-xs"
          >
            <Tooltip label="Update">
              <IconEdit />
            </Tooltip>
          </Button>
          <Button
            onClick={() => server.reload()}
            variant="light"
            size="compact-xs"
          >
            <Tooltip label="Reload">
              <IconReload />
            </Tooltip>
          </Button>
        </Button.Group>
      </Stack>
      <Stack>
        {!data?.length && <Text>No servers found</Text>}
        <Table>
          <Table.Tbody>
            {data.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td w={20}>
                  {server.event?.name === name &&
                    server.event?.action === "remove" && (
                      <ActionIcon
                        onClick={() => {
                          setDeleteCount((prev) => prev + 1);
                          if (deleteCount >= 3) {
                            server.onRemove({ domainId: name, id: item.id });
                            setDeleteCount(0);
                            return;
                          }

                          setTimeout(() => {
                            setDeleteCount(0);
                          }, 3000);
                        }}
                        c={"red"}
                        variant="transparent"
                      >
                        <IconTrash />
                      </ActionIcon>
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
                </Table.Td>
                <Table.Td w={20}>
                  <Text>{index + 1}</Text>
                </Table.Td>
                <Table.Td w={220}>
                  <Text>{item.name}</Text>
                </Table.Td>
                <Table.Td>
                  <Box>
                    {item.ports.map((port: number, index: number) => (
                      <Badge key={index}>{port}</Badge>
                    ))}
                  </Box>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Stack>
  );
}

export default ServerView;
