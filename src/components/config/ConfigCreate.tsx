import configState from "@/state/config";
import {
  Button,
  Container,
  Divider,
  Group,
  Notification,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useFileDialog, useShallowEffect } from "@mantine/hooks";
import { Editor } from "@monaco-editor/react";
import { useSnapshot } from "valtio";

function ConfigCreate() {
  const { create } = useSnapshot(configState);
  return (
    <Container
      w={{
        base: "100%",
        md: "620px",
        lg: "820px",
        xl: "1020px",
      }}
      bg={"dark.9"}
      p={"md"}
    >
      <Stack>
        {create.message && (
          <Notification
            title="Notification"
            onClose={() => (configState.create.message = null)}
          >
            {create.message}
          </Notification>
        )}
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
            onClick={() => configState.create.create({
                name: create.name!,
                text: create.text!
            })}
            loading={configState.create.loading}
          >
            Create
          </Button>
        </Group>
      </Stack>
    </Container>
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
