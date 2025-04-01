import processState from "@/state/process";
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Flex,
  Group,
  Indicator,
  Loader,
  SimpleGrid,
  Stack,
  Text,
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
            base: 1,
            md: 4,
          }}
        >
          {process.list.map((item, index) => (
            <Card key={index}>
              <Stack gap={"md"}>
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
                <Stack gap={"0"} align="center">
                  <Text fw={"bold"} size="1.5rem" lineClamp={1}>
                    {item.namespace}
                  </Text>
                  <Text size="0.8rem" c={"gray.6"}>
                    namespace
                  </Text>
                </Stack>
                <Divider />
                <Stack gap={"0"} align={"center"}>
                  <Text fw={"bold"} size="1.5rem">{item.memory}</Text>
                  <Text size="0.8rem" c={"gray.6"}>memory</Text>
                </Stack>
                <Divider />
                <Stack gap={"0"} align={"center"}>
                  <Text fw={"bold"} size="1.5rem">{item.pm_uptime}</Text>
                  <Text size="0.8rem" c={"gray.6"}>pm_uptime</Text>
                </Stack>
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
