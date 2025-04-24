/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { useDebouncedCallback, useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { useProxy } from "valtio/utils";
import yml from "yaml";
import { z } from "zod";
import stateGithub from "../../_state/state-github";
import dotenv from "dotenv";
import { Prisma } from "@prisma/client";
import { IconMinus } from "@tabler/icons-react";
import { toast } from "react-toastify";
import stateProject from "../../_state/state-project";

export default function Page() {
  const editorRef = useRef<any>(null);
  return (
    <Container w={"100%"}>
      <Stack>
        <Text size="2rem" fw={"bold"}>Create Some Project</Text>
        <Divider />
        <Text>Select Repo</Text>
        <SelectRepo
          onChange={(value) => {
            const json = yml.parse(editorRef.current?.getValue());
            json.name = value.name;
            json.full_name = value.full_name;
            editorRef.current?.setValue(yml.stringify(json));
          }}
        />
        <Divider />
        <EnvStringToJson
          onChange={(value) => {
            const json = yml.parse(editorRef.current?.getValue());
            json.env = value;
            editorRef.current?.setValue(yml.stringify(json));
          }}
        />
        <Divider />
        <Text>Form</Text>
        <FormEditor editorRef={editorRef} />
      </Stack>
    </Container>
  );
}

const formSchema = z
  .object({
    name: z.string().min(3, "Name is required"),
    full_name: z.string().min(3, "Full name is required"),
    push: z.boolean().default(false),
    seed: z.boolean().default(false),
    build: z.boolean().default(true),
    instance: z.number().int().default(1),
    environment: z.object({
      name: z.string().min(3, "Name is required"),
      branch: z.string().min(1, "Branch is required").default("main"),
    }),
    env: z.record(z.any()),
    previewUrl: z.string().url().nullable(),
  })
  .strict();

// const defaultForm = {
//   name: "",
//   full_name: "",
//   push: false,
//   seed: false,
//   build: true,
//   instance: 1,
//   environment: {
//     name: "production",
//     branch: "main",
//   },
//   env: {},
//   previewUrl: null,
// };

function FormEditor({ editorRef }: { editorRef: React.RefObject<any> }) {
  const projectProxy = useProxy(stateProject);
  return (
    <Stack>
      <Editor
        onMount={(editor) => (editorRef.current = editor)}
        defaultValue={yml.stringify(projectProxy.project.create.form)}
        height="400px"
        theme="vs-dark"
        defaultLanguage="yaml"
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />

      <Group justify="flex-end">
        <Button
          variant="light"
          onClick={() => {
            const value = editorRef.current?.getValue();
            if (!value) return;
            try {
              const json = yml.parse(value);
              const result = formSchema.safeParse(json);
              if(result.error) {
                let err = ""
                result.error.errors.forEach((error) => {
                  err += error.message + "\n";
                });
                toast.error(err);
                return;
              }

              projectProxy.project.create.form = result.data;
              projectProxy.project.create.submit();
              
            } catch (error) {
              console.log(error);
              toast.error("Something went wrong ");
            }
          }}
        >
          Submit
        </Button>
      </Group>
    </Stack>
  );
}

function EnvStringToJson({
  onChange,
}: {
  onChange: (value: Record<string, any>) => void;
}) {
  const editorRef = useRef<any>(null);
  const [show, setShow] = useState(false);

  if (!show)
    return (
      <Group>
        <Button variant="light" onClick={() => setShow(true)}>
          Add Env
        </Button>
      </Group>
    );
  return (
    <Card withBorder >
      <Stack>
        <Group justify="flex-end">
          <ActionIcon radius={100} variant="light" onClick={() => setShow(false)}>
            <IconMinus />
          </ActionIcon>
        </Group>
        <Editor
          theme="vs-dark"
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("vs-dark", {
              base: "vs-dark",
              inherit: true,
              rules: [],
              colors: {
                "editor.background": "#1e1e1e",
              },
            });
          }}
          defaultLanguage="ini"
          height={170}
          onMount={(editor) => (editorRef.current = editor)}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
        <Group justify="flex-end">
          <Button
            variant="light"
            onClick={() => {
              const value = editorRef.current?.getValue();
              if (!value) return;
              try {
                const json = dotenv.parse(value);
                onChange(json);
                setShow(false);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Push
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}

function SelectRepo({
  onChange,
}: {
  onChange: (
    value: Prisma.ReposGetPayload<{ omit: { updatedAt: true } }>
  ) => void;
}) {
  const github = useProxy(stateGithub);
  const searchFlush = useDebouncedCallback((value: string) => {
    github.repos.list.search(value);
  }, 300);

  useShallowEffect(() => {
    github.repos.list.load();
  }, []);

  if (!github.repos.list.data)
    return (
      <Group>
        <Skeleton height={40} />
      </Group>
    );
  return (
    <Group>
      <Select
        value={github.repos.selected?.id}
        placeholder="Select a repo"
        searchable
        onSearchChange={searchFlush}
        data={github.repos.list.data.map((repo) => ({
          value: repo.id,
          label: repo.name,
        }))}
        onChange={(value) => {
          if (!value) return;
          const find = github.repos.list.data?.find(
            (repo) => repo.id === value
          );
          if (!find) return;
          github.repos.selected = find;
          onChange(find);
        }}
      />
    </Group>
  );
}
