"use client";
import { UserView } from "@/components/user/UserView";
import { Button, Flex, Stack } from "@mantine/core";
import {
  IconAdjustments,
  IconHome,
  IconProgress,
  IconServer,
} from "@tabler/icons-react";
import _ from "lodash";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

const listNav = [
  {
    label: "Home",
    icon: <IconHome />,
    href: "/admin",
  },
  {
    label: "Server",
    icon: <IconServer />,
    href: "/admin/server",
  },
  {
    label: "Process",
    icon: <IconProgress />,
    href: "/admin/process",
  },
  {
    label: "Config",
    icon: <IconAdjustments />,
    href: "/admin/config",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useSelectedLayoutSegments()[0];
  return (
    <Stack>
      <Flex
        justify={"space-between"}
        p={"xs"}
        bg={"dark.9"}
        pos={"sticky"}
        top={0}
        style={{
          zIndex: 9999,
        }}
      >
        <Button.Group>
          {listNav.map((item) => (
            <Button
              leftSection={item.icon}
              key={item.label}
              variant="transparent"
              component={Link}
              href={item.href}
              c={
                _.startCase(params) === item.label
                  ? "blue.9"
                  : params == null && item.label === "Home"
                  ? "blue.9"
                  : "grey"
              }
              size="compact-xs"
            >
              {item.label}
            </Button>
          ))}
        </Button.Group>
        <UserView />
      </Flex>
      {children}
    </Stack>
  );
}
