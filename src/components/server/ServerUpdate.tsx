/* eslint-disable @typescript-eslint/no-explicit-any */
import serverState from "@/state/server";
import {
  Group,
  Card,
  Stack,
  Flex,
  CloseButton,
  TextInput,
  Button,
  Text,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useProxy } from "valtio/utils";

function ServerUpdate() {
  const server = useProxy(serverState);
  return (
    <Group>
      <Card bg={"dark.9"} miw={300}>
        <Stack>
          <Flex align={"center"} gap={"md"}>
            <CloseButton
              onClick={() => {
                server.event = { name: "", action: "update" };
                server.updateData = null;
              }}
            />
            <Text>Server Update</Text>
          </Flex>
          <Text>{server.event?.name}</Text>
          <TextInput
            placeholder="Name"
            value={server.updateData?.name}
            onChange={(e) =>
              (server.updateData = {
                ...server.updateData,
                name: e.target.value,
              })
            }
          />
          <Flex gap={"md"} align={"center"}>
            <Stack>
              {server.updateData &&
                server.updateData?.ports?.map((port, index) => (
                  <Flex key={index} align={"center"} gap={"md"}>
                    <NumberInput
                      key={index}
                      value={port}
                      onChange={(e) => {
                        server.updateData = {
                          ...server.updateData,
                          ports: server.updateData?.ports?.map((p, i) =>
                            i === index ? Number(e) : p
                          ),
                        } as any;
                      }}
                    />
                    <ActionIcon
                      variant="transparent"
                      onClick={() => {
                        if (!server.updateData) return;
                        server.updateData = {
                          ...server.updateData,
                          ports: server.updateData?.ports?.filter(
                            (p, i) => i !== index
                          ),
                        };
                      }}
                    >
                      <IconMinus />
                    </ActionIcon>
                  </Flex>
                ))}
            </Stack>
            <ActionIcon
              variant="transparent"
              onClick={() => {
                if (!server.updateData) return;
                server.updateData = {
                  ...server.updateData,
                  ports: [...(server.updateData?.ports || []), 3000],
                };
              }}
            >
              <IconPlus />
            </ActionIcon>
          </Flex>
          <Button
            onClick={() => server.onUpdate(server.updateData as any)}
            variant="light"
          >
            Submit
          </Button>
        </Stack>
      </Card>
    </Group>
  );
}

export default ServerUpdate;
