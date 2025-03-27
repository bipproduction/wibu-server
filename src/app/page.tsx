"use client";
import { Card, Center, Stack, Title } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  return (
    <Stack p={"md"}>
      <Title order={2}>Wibu Server</Title>
      <Center>
        <Card withBorder component={Link} href="/admin">
          Admin
        </Card>
      </Center>
    </Stack>
  );
}
