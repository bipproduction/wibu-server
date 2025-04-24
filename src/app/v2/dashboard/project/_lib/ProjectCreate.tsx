/* eslint-disable @typescript-eslint/no-explicit-any */
import stateGithub from "@/app/dashboard/_state/state-github";
import v2ProjectState from "@/app/v2/_state/project";
import { V2ProjectCreateBody } from "@/app/v2/api/_lib/project";
import {
  ActionIcon,
  Button,
  Group,
  Paper,
  Select,
  Skeleton,
  Stack,
} from "@mantine/core";
import { useDebouncedCallback, useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import { Prisma } from "@prisma/client";
import { IconX } from "@tabler/icons-react";
import dotEnv from "dotenv";
import { useRef, useState } from "react";
import { useProxy } from "valtio/utils";
import yaml from "yaml";

const ProjectCreate = () => {
  const editorRef = useRef<any>(null);
  const projectProxy = useProxy(v2ProjectState);
  return (
    <Stack>
      <SelectRepo
        onChange={(repo) => {
          const json: V2ProjectCreateBody = yaml.parse(
            editorRef.current?.getValue()
          );
          json.name = repo.name;
          json.full_name = repo.full_name;
          json.reposId = repo.id;
          editorRef.current?.setValue(yaml.stringify(json));
        }}
      />
      <AddEnvView
        onSubmit={(env) => {
          const json: V2ProjectCreateBody = yaml.parse(
            editorRef.current?.getValue()
          );
          json.env = env;
          editorRef.current?.setValue(yaml.stringify(json));
        }}
      />
      <FormEditor editorRef={editorRef} />
      <Group justify="end">
        <Button
          variant="light"
          onClick={() => {
            const value = editorRef.current?.getValue();
            const json = yaml.parse(value);
            projectProxy.create.form = json;
            projectProxy.create.submit();
          }}
        >
          Submit
        </Button>
      </Group>
    </Stack>
  );
};

const SelectRepo = ({
  onChange,
}: {
  onChange: (
    repo: Prisma.ReposGetPayload<{ omit: { updatedAt: true } }>
  ) => void;
}) => {
  const gitProxy = useProxy(stateGithub);
  const flushSearch = useDebouncedCallback((q: string) => {
    gitProxy.repos.list.search(q);
  }, 500);

  useShallowEffect(() => {
    if (!gitProxy.repos.list.data) {
      gitProxy.repos.list.load();
    }
  }, [gitProxy.repos.list.data]);

  if (!gitProxy.repos.list.data) {
    return <Skeleton height={40} />;
  }
  return (
    <Group>
      <Select
        label="Repository"
        placeholder="Select a repository"
        data={gitProxy.repos.list.data.map((repo) => ({
          value: repo.id,
          label: repo.name,
        }))}
        searchable
        onSearchChange={(search) => {
          flushSearch(search);
        }}
        onChange={(value) => {
          const repo = gitProxy.repos.list.data?.find(
            (repo) => repo.id === value
          );
          if (!repo) return;
          onChange(repo);
        }}
      />
    </Group>
  );
};

const AddEnvView = ({
  onSubmit,
}: {
  onSubmit: (env: Record<string, string>) => void;
}) => {
  const [show, setShow] = useState(false);
  const editorRef = useRef<any>(null);

  if (!show)
    return (
      <Group>
        <Button variant="light" onClick={() => setShow(true)}>
          Add Env
        </Button>
      </Group>
    );
  return (
    <Paper p={"md"} withBorder>
      <Stack>
        <Group justify="end">
          <ActionIcon variant="light" onClick={() => setShow(false)}>
            <IconX />
          </ActionIcon>
        </Group>
        <Editor
          onMount={(editor) => (editorRef.current = editor)}
          height={172}
          theme="vs-dark"
          language="ini"
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
        <Group justify="end">
          <Button
            variant="light"
            onClick={() => {
              const value = editorRef.current?.getValue();
              const env = dotEnv.parse(value);
              onSubmit(env);
              setShow(false);
            }}
          >
           Push
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

const FormEditor = ({ editorRef }: { editorRef: React.RefObject<any> }) => {
  const projectProxy = useProxy(v2ProjectState);
  return (
    <Stack>
      <Editor
        onMount={(editor) => (editorRef.current = editor)}
        language="yaml"
        value={yaml.stringify(projectProxy.create.form)}
        theme="vs-dark"
        height={430}
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </Stack>
  );
};

export default ProjectCreate;
