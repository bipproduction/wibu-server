"use client";
import { ActionIcon, Container, Flex, Stack, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import V2Router from "@/app/v2/_router";
import { IconChevronLeft } from "@tabler/icons-react";
import Link from "next/link";
import { useShallowEffect } from "@mantine/hooks";
import { useProxy } from "valtio/utils";
import v2ProjectState from "@/app/v2/_state/project";
import v2State from "@/app/v2/_state";

const EnvironmentView = () => {
  const { environmentId, projectId } =
    V2Router.routes.dashboard.project.environment.parse(useSearchParams());
  const projectProxy = useProxy(v2ProjectState);

  useShallowEffect(() => {
    if (!environmentId) return;
    projectProxy.environment.findUnique.load({
      environmentId,
    });
  }, []);
  return (
    <Container w={"100%"}>
      <Stack>
        <Flex gap={"md"} align={"center"}>
          <ActionIcon
            variant="light"
            component={Link}
            href={V2Router.routes.dashboard.project.query({
              action: "detail",
              projectId,
            })}
          >
            <IconChevronLeft />
          </ActionIcon>
          <Text size="1.5rem">Environment</Text>
        </Flex>
        <Text>{projectProxy.environment.findUnique.data?.name}</Text>
        <Text>{projectProxy.environment.findUnique.data?.branch}</Text>
      </Stack>
      <ConfigView />
      <ShaView />
    </Container>
  );
};

const ShaView = () => {
  const { environmentId } =
    V2Router.routes.dashboard.project.environment.parse(useSearchParams());
  const state = useProxy(v2State);
  useShallowEffect(() => {
    if (!environmentId) return;
    state.git.sha.findMany.load();
  }, []);
  return <Stack>{JSON.stringify(state.git.sha.findMany.data)}</Stack>;
};

const ConfigView = () => {
  const { environmentId } =
    V2Router.routes.dashboard.project.environment.parse(useSearchParams());
  const projectProxy = useProxy(v2ProjectState);
  useShallowEffect(() => {
    if (!environmentId) return;
    projectProxy.config.findUnique.load({
      projectEnvironmentId: environmentId,
    });
  }, []);
  return <Stack>{JSON.stringify(projectProxy.config.findUnique.data)}</Stack>;
};

export default EnvironmentView;
