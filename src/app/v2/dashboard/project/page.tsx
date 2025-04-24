"use client";
import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useProxy } from "valtio/utils";
import V2Router from "../../_router";
import v2ProjectState from "../../_state/project";
import { IconChevronLeft, IconPlus, IconSearch } from "@tabler/icons-react";
import ProjectCreate from "./_lib/ProjectCreate";

const Page = () => {
  const { action } = V2Router.routes.dashboard.project.parse(useSearchParams());

  return (
    <ProjectView>
      {(() => {
        switch (action) {
          case "detail":
            return <ProjectDetail />;
          case "create":
            return <ProjectCreate />;
          case "no-action":
            return <ProjectListView />;
          default:
            return <ProjectListView />;
        }
      })()}
    </ProjectView>
  );
};

const ProjectView = ({ children }: { children: React.ReactNode }) => {
  const { action } = V2Router.routes.dashboard.project.parse(useSearchParams());
  return (
    <Container w={"100%"} suppressHydrationWarning={true}>
      <Stack>
        <Group gap={"md"}>
          <ActionIcon
            display={action !== "no-action" ? "" : "none"}
            variant="light"
            component={Link}
            href={V2Router.routes.dashboard.project.query({
              action: "no-action",
            })}
          >
            <IconChevronLeft />
          </ActionIcon>
          <Text size={"1.5rem"}>Projects</Text>
        </Group>
        {children}
      </Stack>
    </Container>
  );
};

const ProjectListView = () => {
  const projectProxy = useProxy(v2ProjectState);

  useShallowEffect(() => {
    projectProxy.findMany.load();
  }, []);

  const List = () => {
    if (!projectProxy.findMany.data) {
      return (
        <Stack>
          {Array.from({ length: 5 }).map((v, k) => (
            <Skeleton key={k} h={40} />
          ))}
        </Stack>
      );
    }

    return (
      <Stack>
        {projectProxy.findMany.data?.map((project) => (
          <Paper key={project.id}>
            <Stack>
              <Text
                component={Link}
                href={V2Router.routes.dashboard.project.query({
                  action: "detail",
                  projectId: project.id,
                })}
                fw={"bold"}
              >
                {project.name}
              </Text>
            </Stack>
          </Paper>
        ))}
      </Stack>
    );
  };

  return (
    <Stack>
      <Flex gap={"md"} align={"center"}>
        <TextInput placeholder="Search" rightSection={<IconSearch />} />
        <Button
          leftSection={<IconPlus />}
          variant="light"
          component={Link}
          href={V2Router.routes.dashboard.project.query({
            action: "create",
          })}
        >
          Create Project
        </Button>
      </Flex>
      <List />
    </Stack>
  );
};

const ProjectDetail = () => {
  const { projectId } =
    V2Router.routes.dashboard.project.parse(useSearchParams());
  return (
    <Stack>
      <Text>detail {projectId}</Text>
    </Stack>
  );
};

export default Page;
