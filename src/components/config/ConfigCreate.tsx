import configState from "@/state/config";
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useFileDialog, useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useSnapshot } from "valtio";

function ConfigCreate() {
  const { create } = useSnapshot(configState);
  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Flex gap={"md"}>
        <ActionIcon variant="transparent" onClick={() => window.location.href = "/admin/config"}>
          <IconChevronLeft />
        </ActionIcon>
        <Text size="1.5rem">Create New Config</Text>
      </Flex>
      <Divider />
      <Upload />
      <Divider label={"OR"} labelPosition="center" w={"100%"} />
      <Title order={2}>Create Config</Title>
      <TextInput
        label="Name"
        placeholder="Name"
        value={create.name || ""}
        onChange={(e) => (configState.create.name = e.target.value)}
      />
      <Editor
        height={360}
        value={create.text || ""}
        onChange={(e) => (configState.create.text = e || null)}
        theme="vs-dark"
        defaultLanguage="yaml"
      />
      <Group>
        <Button
          variant="light"
          onClick={() =>
            configState.create.create({
              name: create.name!,
              text: create.text!,
            })
          }
          loading={configState.create.loading}
        >
          Create
        </Button>
      </Group>
    </Stack>
  );
}

function Upload() {
  const fileDialog = useFileDialog({ accept: ".yml" });
  useShallowEffect(() => {
    if (fileDialog.files) {
      const name = fileDialog.files[0].name;
      configState.configUpload.upload({ file: fileDialog.files[0], name });
    }
  }, [fileDialog.files]);
  return (
    <Stack>
      <Title order={3}>Upload Config</Title>
      <Group>
        <Button variant="light" onClick={() => fileDialog.open()}>
          Upload Config
        </Button>
      </Group>
    </Stack>
  );
}

export default ConfigCreate;
