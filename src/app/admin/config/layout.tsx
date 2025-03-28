"use client";
import { Button, CloseButton, Flex, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack>
      <Flex gap={"md"} align={"center"}>
        <CloseButton size={"xl"} component={Link} href={"/admin"} />
        <Title order={2}>Config</Title>
      </Flex>
      <Button.Group>
        <Button variant="light" component={Link} href={"/admin/config/list"}>
          List
        </Button>
        <Button variant="light" component={Link} href={"/admin/config/run"}>
          Run
        </Button>
        <Button variant="light" component={Link} href={"/admin/config/delete"}>
          Delete
        </Button>
        <Button variant="light" component={Link} href={"/admin/config/create"}>
          Create
        </Button>
      </Button.Group>
      {children}
    </Stack>
  );
}
