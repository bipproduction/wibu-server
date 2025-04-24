/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ActionIcon,
  Box,
  Container,
  Flex,
  Paper,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useProxy } from "valtio/utils";
import Routes from "../../_routes";
import stateProject from "../../_state/state-project";

export default function Page() {
  const { projectId, environmentId } = Routes.routes.project.environment.parse(
    useSearchParams()
  );
  const project = useProxy(stateProject);

  useShallowEffect(() => {
    if (!projectId) return;
    project.environtment.findUniq.load({ environmentId: environmentId! });
  }, [projectId, environmentId]);
  return (
    <Container w={"100%"}>
      <Stack>
        <ActionIcon
          color="gray"
          component={Link}
          href={Routes.routes.project.detail.query({ projectId: projectId! })}
        >
          <IconChevronLeft />
        </ActionIcon>
        <Text size="2rem">{project.environtment.findUniq.data?.name}</Text>
        <Box
          bg={"gray"}
          h={200}
          w={{
            base: "100%",
            sm: "340px",
          }}
        ></Box>
        <ConfigView />
        <EnvView />
      </Stack>
    </Container>
  );
}

function ConfigView() {
  const project = useProxy(stateProject);
  const config: any[] = (
    project.environtment.findUniq.data?.config?.json as any
  )?.apps;
  return (
    <Stack>
      <Text size="xl" fw={600}>Config</Text>
      <SimpleGrid cols={2}>
        {config?.map((v, k) => (
          <Paper key={k} p={"md"} withBorder>
            <Stack>
              <Text>{v.name}</Text>
              <Text>{v.namespace}</Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
}

function EnvView() {
  const project = useProxy(stateProject);
  const env: Record<string, string> =
    (project.environtment.findUniq.data?.env?.json as Record<string, string>) ||
    {};
  return (
    <Stack>
      <Text size="xl" fw={600}>Env</Text>
      <Paper withBorder p={"md"}>
      <Stack>
        {Object.entries(env).map(([k], i) => (
          <Flex key={i} gap={"md"}>
            <Text lineClamp={1} w={250}>
              {k}
            </Text>
            <Text>*****</Text>
          </Flex>
        ))}
      </Stack>
    </Paper>
    </Stack>
  );
}
