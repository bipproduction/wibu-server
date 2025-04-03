/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import configState from "@/state/config";
import {
  ActionIcon,
  Button,
  Card,
  Flex,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChevronRight, IconPlus, IconSettings } from "@tabler/icons-react";
import Link from "next/link";
import { useProxy } from "valtio/utils";

function Page() {
  //   const { config: configName } = useParams();
  const config = useProxy(configState);

  useShallowEffect(() => {
    configState.configList.load();
  }, []);

  return (
    <Stack p={"md"}>
      <Flex gap={"md"} align={"center"}>
        <Text size={"1.5rem"}>Config List</Text>
        <ActionIcon
          variant="transparent"
          component={Link}
          href={"/admin/config/create"}
        >
          <Tooltip label={"create config"}>
            <IconPlus />
          </Tooltip>
        </ActionIcon>
      </Flex>
      <Loading list={config.configList.list} />
      <Stack
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <SimpleGrid
          cols={{
            base: 1,
            md: 3,
            xl: 4,
          }}
        >
          {config.configList.list.map((item, index) => (
            <Card key={index} bg={"dark"}>
              <Stack
                gap={"md"}
                align={"center"}
                justify={"space-between"}
                // bg={item.name === configName?.[0] ? "dark" : "dark.9"}
              >
                <IconSettings size={"3rem"} />
                <Flex gap={"md"} align={"center"}>
                  <Text size="1.5rem">{item.name}</Text>
                </Flex>
                <Button
                  variant="transparent"
                  component={Link}
                  href={`/admin/config/${item.name}`}
                >
                  <IconChevronRight />
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
}

function Loading({ list }: { list: any[] }) {
  if (list.length < 1)
    return (
      <Stack w={"100%"}>
        <SimpleGrid
          cols={{
            base: 1,
            md: 4,
          }}
        >
          {Array.from(new Array(5)).map((v, index) => (
            <Skeleton key={index} h={150} />
          ))}
        </SimpleGrid>
      </Stack>
    );
  return null;
}

export default Page;
