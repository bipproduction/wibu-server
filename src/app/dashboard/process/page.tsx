"use client";
import {
  Button,
  Container,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useProxy } from "valtio/utils";
import stateProcess from "../_state/state-process";
import { useShallowEffect } from "@mantine/hooks";
import { IconReload } from "@tabler/icons-react";
import { PROCESS } from "@/types/process";
import Link from "next/link";
import Routes from "../_routes";

export default function Page() {
  const process = useProxy(stateProcess);

  useShallowEffect(() => {
    process.list.load();
  }, []);

  if (!process.list.data)
    return (
      <Container w={"100%"}>
        <Stack>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} height={40} />
          ))}
        </Stack>
      </Container>
    );
  return (
    <Container w={"100%"}>
      <Stack>
        <Flex align={"center"} gap={"md"}>
          <Text size="2rem">Process</Text>
        </Flex>
        <Group>
          <Button
            loading={process.list.loading}
            variant="outline"
            color="grey"
            leftSection={<IconReload />}
            onClick={process.list.sync}
          >
            Sync
          </Button>
        </Group>
        <ProcessView list={process.list.data.online || []} name="Online" />
        <ProcessView list={process.list.data.offline || []} name="Offline" />
      </Stack>
    </Container>
  );
}

function ProcessView({ list, name }: { list: PROCESS[]; name: string }) {
  return (
    <Stack>
      <Text size="2rem">{name}</Text>
      <SimpleGrid
        cols={{
          base: 1,
          sm: 2,
        }}
      >
        {list.map((process, key) => (
          // <Paper c={"white"} key={key} p={"md"} withBorder component={Link} href={processRoutes.detail(process.name)}>
          <Paper
            c={"white"}
            key={key}
            p={"md"}
            withBorder
            component={Link}
            href={Routes.routes.process.detail.query({ name: process.name })}
          >
            <Stack>
              <Text>{process.name}</Text>
              <Text>{process.pm2_env.PORT}</Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
