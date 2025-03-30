"use client";
import { Button, Flex, Stack, Text, Tooltip } from "@mantine/core";
import {
  IconList,
  IconPlayerPlay,
  IconPlus,
  IconTrash
} from "@tabler/icons-react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Flex gap={"md"} align={"center"}>
        <Text size="1.5rem">Config</Text>
      </Flex>
      <Button.Group>
        <Button size="compact-xs" variant="light" component={Link} href={"/admin/config/list"}>
          <Tooltip label="List">
            <IconList />
          </Tooltip>
        </Button>
        <Button size="compact-xs" variant="light" component={Link} href={"/admin/config/run"}>
          <Tooltip label="Run">
            <IconPlayerPlay />
          </Tooltip>
        </Button>
        <Button size="compact-xs" variant="light" component={Link} href={"/admin/config/delete"}>
          <Tooltip label="Delete">
            <IconTrash />
          </Tooltip>
        </Button>
        <Button size="compact-xs" variant="light" component={Link} href={"/admin/config/create"}>
          <Tooltip label="Create">
            <IconPlus />
          </Tooltip>
        </Button>
      </Button.Group>
      {children}
    </Stack>
  );
}
