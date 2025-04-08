'use client'
import { Button, Flex, Stack } from "@mantine/core";
import Link from "next/link";
const root = "/dashboard";
const listMenu = [
  {
    label: "overview",
    href: "/",
  },
  {
    label: "domains",
    href: "/domains",
  },
  {
    label: "settings",
    href: "/settings",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack gap={0} suppressHydrationWarning={true}>
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
