import V2Router from "@/app/v2/_router";
import v2ProjectState from "@/app/v2/_state/project";
import { Checkbox, Group, Paper, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useSearchParams } from "next/navigation";
import { useProxy } from "valtio/utils";

const ProjectDetail = () => {
  const { projectId } =
    V2Router.routes.dashboard.project.parse(useSearchParams());
  const projectProxy = useProxy(v2ProjectState);

  useShallowEffect(() => {
    if (!projectId) return;
    projectProxy.findUniq.load(projectId);
  }, [projectId]);

  if (!projectProxy.findUniq.data) {
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
      <Paper p={"md"} withBorder>
        <Stack>
          <Stack gap={0}>
            <Text fw={"bold"} size="2rem">
              {projectProxy.findUniq.data.name}
            </Text>
            <Text fw={"lighter"}>
              {projectProxy.findUniq.data.repos?.html_url}
            </Text>
          </Stack>
          <Group gap={"md"}>
            <Checkbox
              variant="outline"
              color="white"
              label="Build"
              checked={projectProxy.findUniq.data.build}
              readOnly
            />
            <Checkbox
              variant="outline"
              color="white"
              label="Push"
              checked={projectProxy.findUniq.data.push}
              readOnly
            />
            <Checkbox
              variant="outline"
              color="white"
              label="Seed"
              checked={projectProxy.findUniq.data.seed}
              readOnly
            />
          </Group>
        </Stack>
      </Paper>
      <ProjectEnvironment />
    </Stack>
  );
};

const ProjectEnvironment = () => {
  const projectProxy = useProxy(v2ProjectState);

  useShallowEffect(() => {
    if (!projectProxy.findUniq.data) return;
    projectProxy.environment.findFirst.load({
      projectId: projectProxy.findUniq.data.id,
      name: "production",
    });
  }, []);

  const Loading = () => {
    return (
      <Stack>
        {Array.from({ length: 5 }).map((v, k) => (
          <Skeleton key={k} h={40} />
        ))}
      </Stack>
    );
  };

  const ListView = () => {
    return (
      <Stack>
        <Text>{JSON.stringify(projectProxy.environment.findFirst.data)}</Text>
      </Stack>
    );
  };

  return (
    <Paper p={"md"} withBorder>
      <Stack>
        <Text size="1.5rem" fw={"bold"}>
          Environment
        </Text>
        {projectProxy.environment.findFirst.loading ? <Loading /> : <ListView />}
      </Stack>
    </Paper>
  );
};

export default ProjectDetail;
