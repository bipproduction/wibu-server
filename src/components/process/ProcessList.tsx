import processState from "@/state/process";
import {
  ActionIcon,
  Box,
  Card,
  Flex,
  Group,
  Indicator,
  Loader,
  SimpleGrid,
  Stack,
  Text
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChevronRight, IconRefresh } from "@tabler/icons-react";
import Link from "next/link";
import { useSnapshot } from "valtio";

function ProcessList() {
  const process = useSnapshot(processState);
  useShallowEffect(() => {
    process.load();
  }, []);
  return (
    <Stack p={"md"}>
      <Flex align={"center"} gap={"md"}>
        <Text size="1.5rem">Process List</Text>
        <ActionIcon
          display={process.loading ? "none" : "block"}
          variant="light"
          onClick={() => process.load()}
        >
          <IconRefresh />
        </ActionIcon>
        <Loader size={"sm"} display={process.loading ? "block" : "none"} />
      </Flex>
      <Box
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <SimpleGrid
          spacing={"md"}
          cols={{
            base: 2,
            md: 4,
          }}
        >
          {process.list.map((item, index) => (
            <Card key={index}>
              <Stack gap={0}>
                <Flex gap={"md"} align={"center"}>
                  <Box>
                    <Indicator
                      processing
                      position="bottom-end"
                      color={item.status === "online" ? "green" : "red"}
                      size={16}
                    />
                  </Box>
                  <Text lineClamp={1} size="1.5rem">
                    {item.name}
                  </Text>
                </Flex>
                <Flex gap={"md"}>
                  <Text w={100}>namespace</Text>
                  <Text lineClamp={1}>{item.namespace}</Text>
                </Flex>
                <Flex gap={"md"}>
                  <Text w={100}>memory</Text>
                  <Text>{item.memory}</Text>
                </Flex>
                <Flex gap={"md"}>
                  <Text w={100}>pm_uptime</Text>
                  <Text>{item.pm_uptime}</Text>
                </Flex>
                <Group justify={"right"}>
                  <ActionIcon
                    radius={100}
                    variant="light"
                    component={Link}
                    href={`/admin/process/${item.name}`}
                  >
                    <IconChevronRight />
                  </ActionIcon>
                </Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
}

export default ProcessList;
