/* eslint-disable @typescript-eslint/no-explicit-any */
import serverState from "@/state/server";
import {
  ActionIcon,
  Button,
  Card,
  CloseButton,
  Flex,
  Group,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import toast from "react-simple-toasts";
import { useProxy } from "valtio/utils";

function ServerAdd() {
  const server = useProxy(serverState);
  return (
    <Group>
      <Card bg={"dark.9"} miw={300}>
        <Stack>
          <Flex align={"center"} gap={"md"}>
            <CloseButton
              onClick={() => (server.event = { name: "", action: "add" })}
            />
            <Text>Server Add</Text>
          </Flex>
          <Text>{server.event?.name}</Text>
          <TextInput
            value={server.form?.name || ""}
            label="Name"
            onChange={(e) =>
              (server.form = { ...server.form, name: e.target.value } as any)
            }
          />

          <Flex gap={"md"} align={"center"}>
            <Stack>
              {server.form?.ports?.map((port, index) => (
                <Flex key={index} align={"center"} gap={"md"}>
                  <NumberInput
                    key={index}
                    value={port}
                    onChange={(e) => {
                      server.form = {
                        ...server.form,
                        ports: server.form?.ports?.map((p, i) =>
                          i === index ? Number(e) : p
                        ),
                      } as any;
                    }}
                  />
                  <ActionIcon
                    variant="transparent"
                    onClick={() => {
                      if (server.form && server.form?.ports.length > 1) {
                        server.form?.ports?.splice(index, 1);
                      }
                    }}
                  >
                    <IconMinus />
                  </ActionIcon>
                </Flex>
              ))}
            </Stack>
            <Button.Group>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  server.form = {
                    ...server.form,
                    ports: [...(server.form?.ports || []), 3000],
                  } as any;
                }}
              >
                <IconPlus />
              </ActionIcon>
            </Button.Group>
          </Flex>
          <Button
            onClick={() => {
              if (!server.form?.name || !server.form?.ports?.length)
                return toast("Please fill all fields");

              if (!server.event?.name) return toast("Please select domain");
              server.onCreate({
                domainId: server.event?.name,
                id: server.form?.name,
                name: server.form?.name,
                ports: server.form?.ports,
              });
            }}
            variant="light"
          >
            Submit
          </Button>
        </Stack>
      </Card>
    </Group>
  );
}

export default ServerAdd;
