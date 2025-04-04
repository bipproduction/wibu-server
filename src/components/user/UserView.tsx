"use client";

import { signOut } from "@/lib/auth-client";
import userState from "@/state/user";
import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Menu,
  Skeleton,
  Text,
} from "@mantine/core";
import { useProxy } from "valtio/utils";

export function UserView() {
  const user = useProxy(userState);
  if (!user.session.data || !user.session.data.user)
    return (
      <Group gap={"md"} align="center">
        <Skeleton h={24} w={100} />
        <Skeleton h={24} w={24} radius={100} />
      </Group>
    );
  return (
    <Flex align={"center"} gap={"md"}>
      <Text>{user.session.data?.user.name}</Text>
      <Menu>
        <Menu.Target>
          <ActionIcon radius={100}>
            <Avatar src={user.session.data?.user.image} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() =>
              signOut().then(() => (window.location.href = "/login"))
            }
          >
            <Text>Logout</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}
