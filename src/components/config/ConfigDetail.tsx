import configState from "@/state/config";
import { Button, Group, Notification, Stack, Text, Title, Tooltip } from "@mantine/core";
import { Editor } from "@monaco-editor/react";
import { IconPlayerPlay } from "@tabler/icons-react";
import { useSnapshot } from "valtio";

function ConfigDetail() {
  const { detail, create, run } = useSnapshot(configState);

  return (
    <Stack bg={"dark.9"} p={"md"}>
      <Title order={3}>Config Detail</Title>
      {create.message && (
        <Notification
          title="Notification"
          onClose={() => (configState.create.message = null)}
        >
          {create.message}
        </Notification>
      )}
      <Text>{detail.name}</Text>
      <Editor
        height="300px"
        theme="vs-dark"
        defaultLanguage="yaml"
        value={detail.text ?? ""}
        onChange={(e) => (configState.detail.text = e || null)}
      />
      <Group>
        <Button
          loading={configState.create.loading}
          onClick={() => {
            configState.create.create({
              name: detail.name!,
              text: detail.text!,
            });
          }}
          variant="light"
        >
          Update
        </Button>
        <Button
            loading={run.loading}
            variant="transparent"
            onClick={() => configState.run.run({ name: detail.name! })}
          >
            <Tooltip label="Run">
              <IconPlayerPlay />
            </Tooltip>
          </Button>
      </Group>
    </Stack>
  );
}

export default ConfigDetail;
