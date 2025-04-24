/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text
} from "@mantine/core";
import { useDebouncedCallback, useShallowEffect } from "@mantine/hooks";
import { Editor, OnMount } from "@monaco-editor/react";
import { parse } from "dotenv";
import { useRef } from "react";
import { subscribeKey, useProxy } from "valtio/utils";
import yml from "yaml";
import stateGithub from "../../../_state/state-github";
import stateProject from "../../../_state/state-project";

export function ProjectCreateDetail() {
  const github = useProxy(stateGithub);
  const project = useProxy(stateProject);
  const editorRef = useRef<any>(null);
  const envRef = useRef<any>(null);
  let momory = yml.stringify(project.project.create.form);

  const flushData = useDebouncedCallback((value: string | undefined) => {
    if (!value) return;
    try {
      const json = yml.parse(value);
      if (json.environment && json.environment.branch !== "main") {
        json.environment.branch = "main";
        editorRef.current?.setValue(yml.stringify(json));
      }
      momory = value;
    } catch (error) {
      editorRef.current?.setValue(momory);
    }
  }, 1000);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  useShallowEffect(() => {
    const unsub = subscribeKey(stateGithub.repos, "selected", () => {
      if (github.repos.selected) {
        const json = yml.parse(momory);
        json.name = github.repos.selected.name;
        json.full_name = github.repos.selected.full_name;
        editorRef.current?.setValue(yml.stringify(json));
        momory = yml.stringify(json);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <Stack>
      <Paper withBorder p={"md"}>
        <Stack>
          <SimpleGrid cols={2}>
            <Stack>
              <Text>Parse Env</Text>
              <Editor
                defaultLanguage="ini"
                height={200}
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
                onMount={(editor) => (envRef.current = editor)}
              />
              <Group>
                <Button
                  variant="outline"
                  color="grey"
                  onClick={() => {
                    const json = yml.parse(momory);
                    const value = envRef.current?.getValue();
                    if (!value) return;
                    json.env = parse(value);
                    momory = yml.stringify(json);
                    editorRef.current?.setValue(momory);
                    envRef.current?.setValue("");
                  }}
                >
                  Insert
                </Button>
              </Group>
            </Stack>
            <Stack>
              <Text>Form</Text>
              <Editor
                height={320}
                defaultLanguage="yaml"
                defaultValue={momory}
                theme="vs-dark"
                options={{
                  minimap: {
                    enabled: false,
                  },
                }}
                onMount={handleEditorDidMount}
                onChange={flushData}
                onValidate={(markers) => {
                  if (markers.length > 0) {
                    markers.forEach((marker) => {
                      console.log(marker.message);
                    });
                  } else {
                    console.log("No errors");
                  }
                }}
              />
            </Stack>
          </SimpleGrid>
        </Stack>
      </Paper>
    </Stack>
  );
}
