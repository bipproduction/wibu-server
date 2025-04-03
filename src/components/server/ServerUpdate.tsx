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
  Divider,
} from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useProxy } from "valtio/utils";

function ServerUpdate({
  item,
  onClose,
}: {
  item: {
    domainId: string;
    id: string;
    name: string;
    ports: number[];
  };
  onClose: () => void;
}) {
  const server = useProxy(serverState);
  const [updateData, setUpdateData] = useState<typeof item>(item);
  return (
    <Group>
      <Card bg={"dark.9"} >
        <Stack>
          <Flex align={"center"} gap={"md"}>
            <CloseButton onClick={onClose} />
            <Text>Server Update</Text>
          </Flex>
          <Text>{item.name}</Text>
          <TextInput
            placeholder="Name"
            value={item.name}
            onChange={(e) =>
              setUpdateData({
                ...updateData,
                name: e.target.value,
              })
            }
          />
          <Flex gap={"md"} align={"center"}>
            <Stack>
              {updateData?.ports?.map((port, index) => (
                <Flex key={index} align={"center"} gap={"md"}>
                  <NumberInput
                    key={index}
                    value={port}
                    onChange={(e) => {
                      setUpdateData({
                        ...updateData,
                        ports: updateData?.ports?.map((p, i) =>
                          i === index ? Number(e) : p
                        ),
                      });
                    }}
                    rightSection={
                      <ActionIcon
                        radius={100}
                        variant="light"
                        onClick={() => {
                          setUpdateData({
                            ...updateData,
                            ports: updateData?.ports?.filter(
                              (p, i) => i !== index
                            ),
                          });
                        }}
                      >
                        <IconMinus />
                      </ActionIcon>
                    }
                  />
                </Flex>
              ))}
            </Stack>
            <Divider size={"0.1"} orientation="vertical" />
            <ActionIcon
              radius={100}
              variant="light"
              onClick={() => {
                setUpdateData({
                  ...updateData,
                  ports: [...(updateData?.ports || []), 3000],
                });
              }}
            >
              <IconPlus />
            </ActionIcon>
          </Flex>
          <Button
            onClick={() => {
              server.onUpdate(updateData);
              onClose();
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

export default ServerUpdate;
