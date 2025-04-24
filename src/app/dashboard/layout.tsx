"use client";
import { Button, Flex, Stack } from "@mantine/core";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
const root = "/dashboard";
const listMenu = [
  {
    label: "overview",
    href: "/",
  },
  {
    label: "project",
    href: "/project",
  },
  {
    label: "domains",
    href: "/domains",
  },
  {
    label: "process",
    href: "/process",
  },
  {
    label: "settings",
    href: "/settings",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const current = segments[0];

  return (
    <Stack suppressHydrationWarning={true} gap={"md"}>
      <Flex
        bg={"dark.9"}
        pos={"sticky"}
        top={0}
        style={{
          zIndex: 9999,
        }}
      >
        <Button.Group>
          {listMenu.map((v, k) => (
            <Button
              bg={
                current === v.label || (current === undefined && k === 0)
                  ? "gray.7"
                  : "dark.9"
              }
              variant="transparent"
              c={"white"}
              component={Link}
              key={k}
              href={`${root}${v.href}`}
            >
              {v.label}
            </Button>
          ))}
        </Button.Group>
      </Flex>
      {children}
    </Stack>
  );
}

