/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Stack, Text } from "@mantine/core";
import { useParams } from "next/navigation";

const listPage = [
  {
    label: "project",
    href: "/project",
    Component({ slug }: { slug: string[] }) {
      return <Text>{slug.join("/")}</Text>;
    },
  },
  {
    label: "domains",
    href: "/domains",
    Component({ slug }: { slug: string[] }) {
      return <Text>Domains</Text>;
    },
  },
  {
    label: "settings",
    href: "/settings",
    Component({ slug }: { slug: string[] }) {
      return <Text>Settings</Text>;
    },
  },
];

export default function Page() {
  const { slug } = useParams();
  const [param] = slug as string[];
  const Component = listPage.find((v) => v.href === "/" + param)?.Component;
  if (!Component) return <NotFound />;
  return (
    <Stack suppressHydrationWarning={true}>
      <Component slug={slug as string[]} />
    </Stack>
  );
}

function NotFound() {
  return (
    <Stack h={"100vh"} align="center" justify="center">
      <Text>404</Text>
    </Stack>
  );
}
