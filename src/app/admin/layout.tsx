'use client'
import { Button, Stack } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack>
      <Button.Group>
        <Button variant="light" component={Link} href={"/admin"}>
          <IconHome />
        </Button>
        <Button variant="light" component={Link} href={"/admin/server"}>
          Server
        </Button>
        <Button variant="light" component={Link} href={"/admin/process"}>
          Process
        </Button>
        <Button variant="light" component={Link} href={"/admin/config"}>
          Config
        </Button>
      </Button.Group>
      {children}
    </Stack>
  );
}
