/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Routes from "@/app/dashboard/_routes";
import {
    ActionIcon,
    Button,
    Container,
    Divider,
    Flex,
    Group,
    NumberInput,
    Paper,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { useDebouncedCallback, useShallowEffect } from "@mantine/hooks";
import {
    IconChevronLeft,
    IconGitBranch,
    IconMinus,
    IconPlus,
    IconRefresh
} from "@tabler/icons-react";
import { parse } from "dotenv";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useProxy } from "valtio/utils";
import stateGithub from "../../../_state/state-github";
import stateProject from "../../../_state/state-project";

export default function Page() {
  const github = useProxy(stateGithub);
  const project = useProxy(stateProject);
  // const { projectId } = projectRoutes.environmentCreate.Parse();
  const { projectId } = Routes.routes.project.environment.create.parse(useSearchParams());
  const [repo, setRepo] = useState<Record<string, any> | null>(null);

  useShallowEffect(() => {
    async function getRepo() {
      if (!projectId) return;
      const repo = await github.repos.get({ projectId });
      setRepo(repo ?? null);
      await project.project.getProject.load({ id: projectId });
      project.environtment.create.form.projectId = projectId;
    }
    getRepo();
  }, [projectId]);
  return (
   <Container w={"100%"}>
     <Stack>
        <ActionIcon color="gray" component={Link} href={Routes.routes.project.detail.query({ projectId })}>
            <IconChevronLeft />
        </ActionIcon>
     <Paper p={"md"} withBorder>
      <Stack>
        <Text size="1.8rem">Lets build something new</Text>
        <Text size="1.rem">
          {project.project.getProject.data?.name} Projects
        </Text>
        <TextInput
          label="Environment Name"
          placeholder="Environment Name"
          value={project.environtment.create.form.environment.name}
          onChange={(e) =>
            (project.environtment.create.form.environment.name = e.target.value)
          }
        />
        <Paper p="sm" bg={"gray.8"}>
          <Stack>
            <Text fz={"xs"}>Repo From</Text>
            <Text size="2rem">{repo?.name}</Text>
            <Divider />
            <Flex c={"gray"} align={"center"} gap={"md"}>
              <IconGitBranch />
              <BranchSelect
                projectId={projectId!}
                onSelect={(branch) => {
                  if (!branch) return;
                  project.environtment.create.form.environment.branch = branch;
                }}
              />
            </Flex>
          </Stack>
        </Paper>
        <Stack>
          <Group>
            <NumberInput
              value={project.environtment.create.form.instance}
              onChange={(e) =>
                (project.environtment.create.form.instance = Number(e || "1"))
              }
              label="Instance"
              placeholder="Instance"
            />
          </Group>
        </Stack>
        <EnvironmentView />
        <TextInput
          value={project.environtment.create.form.previewUrl || ""}
          onChange={(e) =>
            (project.environtment.create.form.previewUrl = e.target.value)
          }
          label="Preview URL"
          placeholder="Preview URL"
        />
        <Button
          loading={project.environtment.create.loading}
          onClick={project.environtment.create.submit}
          variant="white"
        >
          Sublit
        </Button>
      </Stack>
    </Paper>
     </Stack>
   </Container>
  );
}

function EnvironmentView() {
  const project = useProxy(stateProject);
  const [formText, setFormText] = useState("");
  return (
    <Paper withBorder p={"md"}>
      <Stack>
        <Text>Env</Text>
        <Textarea
          autosize
          placeholder="Paste Copy Text"
          value={formText}
          onChange={(e) => setFormText(e.target.value)}
        />
        <Group justify="end">
          <Button
            variant="white"
            onClick={() => {
              const parsed = parse(formText);
              project.environtment.create.form.env.push(
                ...Object.entries(parsed).map(([key, value]) => ({
                  key,
                  value,
                }))
              );
              setFormText("");
            }}
          >
            Submit
          </Button>
        </Group>
        <Divider label={"Add More"} />
        {project.environtment.create.form.env.map((v, k) => (
          <Flex key={k} gap={"md"} align={"center"}>
            <TextInput
              placeholder="key"
              value={v.key}
              onChange={(e) =>
                (project.environtment.create.form.env[k].key = e.target.value)
              }
            />
            <TextInput
              flex={1}
              placeholder="value"
              value={v.value}
              onChange={(e) =>
                (project.environtment.create.form.env[k].value = e.target.value)
              }
            />
            <ActionIcon
              variant="subtle"
              radius={100}
              onClick={() => {
                project.environtment.create.form.env =
                  project.environtment.create.form.env.filter(
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
              project.environtment.create.form.env.push({
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

function BranchSelect({
  projectId,
  onSelect,
}: {
  projectId: string;
  onSelect: (branch: string | null) => void;
}) {
  const github = useProxy(stateGithub);
  const handle = useDebouncedCallback((q: string) => {
    console.log(q);
    github.branch.list.search({ projectId, q });
  }, 200);

  useShallowEffect(() => {
    async function loadBranch() {
      await github.branch.list.load({ projectId });
    }
    loadBranch();
  }, []);
  return (
    <Select
      leftSection={
        <ActionIcon
          variant="white"
          disabled={github.branch.list.loadingSync}
          onClick={async () => {
            await github.branch.list.syncData({ projectId });
          }}
        >
          <Tooltip label="Sync Branch">
            <IconRefresh />
          </Tooltip>
        </ActionIcon>
      }
      placeholder="Select branch"
      disabled={github.branch.list.loading}
      onSearchChange={(q) => handle(q ?? "")}
      data={
        github.branch.list.data?.map((b) => ({
          value: b.name,
          label: b.name,
        })) ?? []
      }
      onChange={onSelect}
      searchable
    />
  );
}
