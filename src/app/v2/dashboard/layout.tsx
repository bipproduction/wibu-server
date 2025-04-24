"use client";
import { Group, Paper, Stack } from "@mantine/core";
import { useSelectedLayoutSegments } from "next/navigation";
import V2Router from "../_router";
import Link from "next/link";

const listMenu = [
  {
    name: "Home",
    href: V2Router.routes.dashboard.get(),
  },
  {
    name: "Project",
    href: V2Router.routes.dashboard.project.query({ action: "no-action" }),
  },
  {
    name: "Git",
    href: V2Router.routes.dashboard.git.get(),
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();
  return (
    <Stack >
      <Paper
        withBorder
        p={"xs"}
        pos={"sticky"}
        top={0}
        style={{ zIndex: 9999 }}
      >
        <Group p={"xs"}>
          {listMenu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                color:
                  segments.length === 0 && item.name === "Home"
                    ? "white"
                    : segments?.[0] === item.name.toLowerCase()
                      ? "white"
                      : "gray",
              }}
            >
              {item.name}
            </Link>
          ))}
        </Group>
      </Paper>
      {children}
    </Stack>
  );
}
