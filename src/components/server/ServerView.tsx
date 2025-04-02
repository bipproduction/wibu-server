/* eslint-disable @typescript-eslint/no-explicit-any */
import serverState from "@/state/server";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Tooltip
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import {
  IconEdit,
  IconPlus,
  IconReload,
  IconServer2,
  IconShare,
  IconTrash,
  IconWorldWww,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { useProxy } from "valtio/utils";
import ServerAdd from "./ServerAdd";
import ServerUpdate from "./ServerUpdate";

const listMenu = [
  {
    label: "Add",
    icon: <IconPlus />,
    onClick: (name: string) => (serverState.event = { name, action: "add" }),
  },
  {
    label: "Reload",
    icon: <IconReload />,
    onClick: () => serverState.reload(),
  },
];

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
  // const [deleteCount, setDeleteCount] = useState(0);
  if (!data) return <SimpleGrid cols={{
    base: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  }} >
    {Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} height={200} />)}
  </SimpleGrid>

  if (server.event?.name === name && server.event.action === "add") {
    return <ServerAdd />;
  }

  return (
    <Stack>
      <Stack p={"xs"}>
        <Flex gap={"md"} align={"center"}>
          <IconServer2 />
          <Text size="2rem">{name}</Text>
        </Flex>
        <Button.Group>
          {listMenu.map((item) => (
            <Button
              bg={"dark"}
              key={item.label}
              variant="light"
              size="compact-xs"
              onClick={() => item.onClick(name)}
            >
              <Tooltip label={item.label}>{item.icon}</Tooltip>
            </Button>
          ))}
        </Button.Group>
      </Stack>
      <Stack>
        {!data?.length && <Text>No servers found</Text>}
        <SimpleGrid
          cols={{
            base: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 5,
          }}
        >
          {data.map((item, index) => (
            <Card key={index}>
              <ItemView item={item} index={index} />
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}

function ItemView({ item, index }: { item: any; index: number }) {
  const [action, setAction] = useState<"delete" | "update" | null>(null);
  const server = useProxy(serverState);
  return (
    <Stack key={index}>
      <Stack display={action ? "none" : "block"}>
        <Flex gap={"md"}>
          <IconWorldWww />
          <Text lineClamp={1} size="1.5rem">
            {item.name}
          </Text>
        </Flex>
        <Flex align={"center"} gap={"md"} justify={"end"}>
          <ActionIcon
            onClick={() => {
              setAction("delete");
            }}
            c={"red"}
            variant="transparent"
          >
            <IconTrash />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              setAction("update");
            }}
            variant="transparent"
          >
            <IconEdit />
          </ActionIcon>
        </Flex>
        <Divider size={"0.1"} />
        <Stack>
          <Text>PORT:</Text>
          <Group gap={"xs"}>
            {item.ports.map((port: number, index: number) => (
              <Badge
                bg={"gray"}
                leftSection={<IconShare size={16} />}
                key={index}
              >
                {port}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Stack>
      {action === "delete" && (
        <Card>
          <Stack>
            <Flex align={"center"} gap={"md"} justify={"space-between"}>
              <IconTrash size={42} />
              <Text>Are you sure you want to delete this server?</Text>
              <ActionIcon variant="transparent" onClick={() => setAction(null)}>
                <IconX />
              </ActionIcon>
            </Flex>
            <Button
              onClick={() => {
                server.onRemove({ domainId: item.domainId, id: item.id });
                setAction(null);
              }}
            >
              Delete
            </Button>
          </Stack>
        </Card>
      )}

      {action === "update" && (
        <Card>
          <ServerUpdate item={item} onClose={() => setAction(null)} />
        </Card>
      )}
    </Stack>
  );
}

export default ServerView;
