"use client";
import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { IconGitBranch, IconMinus, IconPlus } from "@tabler/icons-react";
import { subscribeKey, useProxy } from "valtio/utils";
import stateGithub from "../../_state/state-github";
import stateProject from "../../_state/state-project";

export function ProjectCreateDetail() {
  const github = useProxy(stateGithub);
  const project = useProxy(stateProject);

  useShallowEffect(() => {
    const unsub = subscribeKey(stateGithub.repos, "selected", () => {
      if (github.repos.selected) {
        project.create.form.name = github.repos.selected.name;
        project.create.form.full_name = github.repos.selected.full_name;
      }
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <Paper p={"md"} withBorder>
      <Stack>
        <Text size="1.8rem">Lets build something new</Text>
        <Text size="xs">Create a new project from a github repository</Text>
        <Paper p="sm" bg={"gray.8"}>
          <Stack>
            <Text fz={"xs"}>Repo From</Text>
            <Text>
              {project.create.form.full_name}
            </Text>
            <Divider />
            <Flex c={"gray"} align={"center"} gap={"md"}>
              <IconGitBranch />
              <Text>{project.create.form.branch}</Text>
            </Flex>
          </Stack>
        </Paper>
        <TextInput
          value={project.create.form.name}
          onChange={(e) => (project.create.form.name = e.target.value)}
          label="Project Name"
          placeholder="Project Name"
        />
        <Stack>
          <Checkbox
            checked={project.create.form.push}
            onChange={(e) => (project.create.form.push = e.target.checked)}
            label={"db push"}
          />
          <Checkbox
            checked={project.create.form.seed}
            onChange={(e) => (project.create.form.seed = e.target.checked)}
            label={"db seed"}
          />
          <Checkbox
            checked={project.create.form.build}
            onChange={(e) => (project.create.form.build = e.target.checked)}
            label={"build"}
          />
        </Stack>
        <EnvironmentView />
        <Button
          onClick={project.create.submit}
          variant="white"
        >
          Deploy
        </Button>
      </Stack>
    </Paper>
  );
}

function EnvironmentView() {
  const project = useProxy(stateProject);
  return (
    <Paper withBorder p={"md"}>
      <Stack>
        <Text>Env</Text>
        {project.create.form.environment.map((v, k) => (
          <Flex key={k} gap={"md"} align={"center"}>
            <TextInput
              placeholder="key"
              value={v.key}
              onChange={(e) =>
                (project.create.form.environment[k].key = e.target.value)
              }
            />
            <TextInput
              flex={1}
              placeholder="value"
              value={v.value}
              onChange={(e) =>
                (project.create.form.environment[k].value = e.target.value)
              }
            />
            <ActionIcon
              variant="subtle"
              radius={100}
              onClick={() => {
                project.create.form.environment =
                  project.create.form.environment.filter(
                    (_, index) => index !== k
                  );
              }}
            >
              <IconMinus />
            </ActionIcon>
          </Flex>
        ))}
        <Group>
          <Button
            onClick={() =>
              project.create.form.environment.push({
                key: "",
                value: "",
              })
            }
            variant="outline"
            color="gray.6"
            leftSection={<IconPlus />}
          >
            Add More
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
