"use client";
import configState from "@/state/config";
import { ActionIcon, Button, Flex, Grid, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChevronRight, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProxy } from "valtio/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Grid>
      <Grid.Col
        span={{
          xs: 12,
          md: 3,
        }}
      >
        <List />
      </Grid.Col>
      <Grid.Col
        span={{
          xs: 12,
          md: 9,
        }}
      >
        {children}
      </Grid.Col>
    </Grid>
  );
}

function List() {
  const { config: configName } = useParams();
  const config = useProxy(configState);

  useShallowEffect(() => {
    console.log(configName);
    configState.configList.load();
  }, []);
  return (
    <Stack bg={"dark.9"} p={"md"} flex={0}>
      <Flex gap={"md"} align={"center"} justify={"space-between"}>
        <Text size={"1.5rem"}>Config List</Text>
        <ActionIcon variant="transparent"  component={Link} href={"/admin/config/create"}>
          <IconPlus />
        </ActionIcon>
      </Flex>

      <Stack
        style={{
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Stack gap={"xs"}>
          {config.configList.list.map((item, index) => (
            <Flex
              key={index}
              gap={"md"}
              align={"center"}
              bg={item.name === configName?.[0] ? "dark" : "dark.9"}
            >
              <Text>{index + 1}</Text>
              <Text w={172}>{item.name}</Text>
              <Button
                variant="transparent"
                component={Link}
                href={`/admin/config/${item.name}`}
              >
                <IconChevronRight />
              </Button>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <Stack>
//       <Flex gap={"md"} align={"center"}>
//         <Text size="1.5rem">Config</Text>
//       </Flex>
//       <Button.Group>
//         <Button size="compact-xs" variant="light" component={Link} href={"/admin/config/list"}>
//           <Tooltip label="List">
//             <IconList />
//           </Tooltip>
//         </Button>
//         <Button size="compact-xs" variant="light" component={Link} href={"/admin/config/run"}>
//           <Tooltip label="Run">
//             <IconPlayerPlay />
//           </Tooltip>
//         </Button>
//         <Button size="compact-xs" variant="light" component={Link} href={"/admin/config/delete"}>
//           <Tooltip label="Delete">
//             <IconTrash />
//           </Tooltip>
//         </Button>
//         <Button size="compact-xs" variant="light" component={Link} href={"/admin/config/create"}>
//           <Tooltip label="Create">
//             <IconPlus />
//           </Tooltip>
//         </Button>
//       </Button.Group>
//       {children}
//     </Stack>
//   );
// }
